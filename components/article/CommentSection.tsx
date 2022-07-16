import Link from 'next/link';
import { ArticleViewFragment } from '../../generated/graphql';
import { useCurrentUser } from '../../lib/hooks/use-current-user';
import ArticleComment from './ArticleComment';
import CommentForm from './CommentForm';

export default function CommentSection({ article }: { article: ArticleViewFragment }) {
  const { user } = useCurrentUser();

  return (
    <div className='row'>
      <div className='col-xs-12 col-md-8 offset-md-2'>
        {user ? (
          <CommentForm user={user} article={article} />
        ) : (
          <p style={{ display: 'inherit' }}>
            <Link href='/login'>Sign in</Link> or <Link href='/register'>sign up</Link> to add comments on this article.
          </p>
        )}
        {article.comments.map((comment) => (
          <ArticleComment key={comment.id} comment={comment} article={article} />
        ))}
      </div>
    </div>
  );
}
