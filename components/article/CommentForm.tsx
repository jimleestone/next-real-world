import * as R from 'ramda';
import React, { useState } from 'react';
import {
  ArticleViewFragment,
  AuthUser,
  CommentViewFragmentDoc,
  useCreateCommentMutation,
} from '../../generated/graphql';
import { useErrorsHandler } from '../../lib/hooks/use-errors-handler';
import CustomImage from '../common/CustomImage';

export default function CommentForm({
  user: { image, username },
  article,
}: {
  user: AuthUser;
  article: ArticleViewFragment;
}) {
  const [commentBody, setCommentBody] = useState<string>('');
  const { handleErrors } = useErrorsHandler();

  const [createComment, { loading }] = useCreateCommentMutation({
    update(cache, { data }) {
      if (data) {
        const newComment = data.createComment;
        cache.modify({
          id: cache.identify(article),
          fields: {
            comments(existingCommentRefs = [], { readField }) {
              const newCommentRef = cache.writeFragment({
                data: newComment,
                fragment: CommentViewFragmentDoc,
              });
              if (existingCommentRefs.some((ref: any) => readField('id', ref) === newComment.id)) {
                return existingCommentRefs;
              }
              // prepend new comment to the top
              return R.prepend(newCommentRef, existingCommentRefs);
            },
          },
        });
      }
    },
    onCompleted: () => setCommentBody(''),
    onError: (err) => handleErrors(err),
  });
  function onCommentChange(ev: React.ChangeEvent<HTMLTextAreaElement>) {
    setCommentBody(ev.target.value);
  }
  function onPostComment(): (ev: React.FormEvent) => void {
    return async (ev) => {
      ev.preventDefault();
      await createComment({ variables: { slug: article.slug, input: { body: commentBody } } });
    };
  }
  return (
    <form className='card comment-form' onSubmit={onPostComment()}>
      <div className='card-block'>
        <textarea
          className='form-control'
          placeholder='Write a comment...'
          rows={3}
          onChange={onCommentChange}
          value={commentBody}
          disabled={loading}
        ></textarea>
      </div>
      <div className='card-footer'>
        <CustomImage src={image} alt={username} className='comment-author-img' height={30} width={30} />
        <button className='btn btn-sm btn-primary' disabled={loading}>
          Post Comment
        </button>
      </div>
    </form>
  );
}
