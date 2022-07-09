import React from 'react';
import { createComment, getComments } from '../../../services/comment.service';
import { store } from '../../../store/store';
import { User } from '../../../types/user';
import { updateCommentBody } from '../article-page.slice';

export default function CommentForm({
  user: { image },
  commentBody,
  slug,
  submittingComment,
}: {
  user: User;
  commentBody: string;
  slug: string;
  submittingComment: boolean;
}) {
  return (
    <React.Fragment>
      <form className='card comment-form' onSubmit={onPostComment(slug, commentBody)}>
        <div className='card-block'>
          <textarea
            className='form-control'
            placeholder='Write a comment...'
            rows={3}
            onChange={onCommentChange}
            value={commentBody}
          ></textarea>
        </div>
        <div className='card-footer'>
          <img src={image || undefined} className='comment-author-img' />
          <button className='btn btn-sm btn-primary' disabled={submittingComment}>
            Post Comment
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}

function onCommentChange(ev: React.ChangeEvent<HTMLTextAreaElement>) {
  store.dispatch(updateCommentBody(ev.target.value));
}

function onPostComment(slug: string, body: string): (ev: React.FormEvent) => void {
  return async (ev) => {
    ev.preventDefault();
    await store.dispatch(createComment({ slug, body }));
    await store.dispatch(getComments(slug));
  };
}
