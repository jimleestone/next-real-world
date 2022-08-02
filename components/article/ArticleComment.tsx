import { CommentViewFragment, useDeleteCommentMutation } from '../../generated/graphql';
import { useCurrentUser } from '../../lib/hooks/use-current-user';
import { useMessageHandler } from '../../lib/hooks/use-message';
import ArticleAuthorInfo, { AuthorInfo } from './ArticleAuthorInfo';

export default function ArticleComment({ comment }: { comment: CommentViewFragment }) {
  const { user } = useCurrentUser();
  const { success, handleErrors } = useMessageHandler();
  const { id, body, author, createdAt } = comment;
  const { username, image } = author;
  const authorInfo: AuthorInfo = { createdAt, username, image };

  const [deleteComment] = useDeleteCommentMutation({
    optimisticResponse: { deleteComment: { id, __typename: 'Comment' } },
    update(cache, { data }) {
      if (data) {
        const deleted = data.deleteComment;
        // a cache.updateQuery approach seems not work here ...
        cache.modify({
          fields: {
            comments(existingCommentRefs = [], { readField }) {
              return existingCommentRefs.filter((commentRef: any) => deleted.id !== readField('id', commentRef));
            },
          },
          optimistic: true,
        });
      }
    },
    onError: (err) => handleErrors({ err, mode: 'toast' }),
    onCompleted: () => success({ content: 'Comment deleted!', mode: 'toast' }),
  });
  async function onDeleteComment() {
    await deleteComment({ variables: { deleteCommentId: id } });
  }

  return (
    <div className='border rounded-sm shadow-sm mb-2'>
      <div className='p-4'>
        <p className=''>{body}</p>
      </div>
      <div className='bg-gray-100 py-2 px-4 border shadow-sm'>
        <div className='flex flex-wrap items-center justify-between mx-auto'>
          <ArticleAuthorInfo authorInfo={authorInfo} inlined />
          {user && user.username === username && (
            <span className='self-end'>
              <i
                className='ion-trash-a cursor-pointer'
                aria-label={`Delete comment #${id}`}
                onClick={() => onDeleteComment()}
              ></i>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
