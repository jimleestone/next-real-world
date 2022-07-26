import { ArticleViewFragment } from '../../generated/graphql';
import { useCurrentUser } from '../../lib/hooks/use-current-user';
import CustomLink from '../common/CustomLink';
import ArticleComment from './ArticleComment';
import CommentForm from './CommentForm';

export default function CommentSection({ article }: { article: ArticleViewFragment }) {
  const { user } = useCurrentUser();

  return (
    <div className='p-4 bg-gray-50 '>
      <div className='container flex flex-col items-center mx-auto'>
        <div className='w-8/12'>
          {user ? (
            <CommentForm user={user} article={article} />
          ) : (
            <p>
              <CustomLink href='/login' mode='primary' underlined>
                Sign in
              </CustomLink>{' '}
              or{' '}
              <CustomLink href='/register' mode='primary' underlined>
                sign up
              </CustomLink>{' '}
              to add comments on this article.
            </p>
          )}
          <ul className='mt-4'>
            {article.comments.map((comment) => (
              <ArticleComment key={comment.id} comment={comment} article={article} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
