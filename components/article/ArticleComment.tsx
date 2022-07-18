import { format } from 'date-fns';
import { ArticleViewFragment, CommentViewFragment, useDeleteCommentMutation } from '../../generated/graphql';
import { useCurrentUser } from '../../lib/hooks/use-current-user';
import { useErrorsHandler } from '../../lib/hooks/use-errors-handler';
import CustomImage from '../common/CustomImage';
import CustomLink from '../common/CustomLink';

export default function ArticleComment({
  comment: {
    id,
    body,
    createdAt,
    author: { username, image },
  },
  article,
}: {
  comment: CommentViewFragment;
  article: ArticleViewFragment;
}) {
  const { user } = useCurrentUser();
  const { handleErrors } = useErrorsHandler();

  const [deleteComment] = useDeleteCommentMutation({
    optimisticResponse: { deleteComment: { id, __typename: 'Comment' } },
    update(cache, { data }) {
      if (data) {
        const deleted = data.deleteComment;
        cache.modify({
          id: cache.identify(article),
          fields: {
            comments(existingCommentRefs = [], { readField }) {
              return existingCommentRefs.filter((commentRef: any) => deleted.id !== readField('id', commentRef));
            },
          },
        });
      }
    },
    onError: (err) => handleErrors(err),
  });
  async function onDeleteComment() {
    await deleteComment({ variables: { deleteCommentId: id } });
  }

  return (
    <div className='card'>
      <div className='card-block'>
        <p className='card-text'>{body}</p>
      </div>
      <div className='card-footer'>
        <CustomLink className='comment-author' href={{ pathname: '/profile/[username]', query: { username } }}>
          <CustomImage src={image} alt={username} className='comment-author-image' />
        </CustomLink>
        &nbsp;
        <CustomLink className='comment-author' href={{ pathname: '/profile/[username]', query: { username } }}>
          {username}
        </CustomLink>
        <span className='date-posted'>{format(new Date(createdAt), 'PP')}</span>
        {user && user.username === username && (
          <span className='mod-options'>
            <i className='ion-trash-a' aria-label={`Delete comment #${id}`} onClick={() => onDeleteComment()}></i>
          </span>
        )}
      </div>
    </div>
  );
}
