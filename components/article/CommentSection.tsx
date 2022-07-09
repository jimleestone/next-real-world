import Link from 'next/link';
import { ArticleViewFragment } from '../../generated/graphql';
import ArticleComment from './ArticleComment';

export default function CommentSection({ article: { slug, comments } }: { article: ArticleViewFragment }) {
  return (
    <div className='row'>
      <div className='col-xs-12 col-md-8 offset-md-2'>
        <p style={{ display: 'inherit' }}>
          <Link href='/login'>Sign in</Link> or <Link href='/register'>sign up</Link> to add comments on this article.
        </p>

        {/* <CommentForm
              user={user}
              slug={article.slug}
              submittingComment={submittingComment}
              commentBody={commentBody}
            /> */}

        {comments.map((comment, index) => (
          <ArticleComment key={comment.id} comment={comment} slug={slug} index={index} />
        ))}
      </div>
    </div>
  );
}
