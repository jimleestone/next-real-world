import { NetworkStatus } from '@apollo/client';
import { useCallback, useState } from 'react';
import { ArticleViewFragment, useCommentsQuery } from '../../generated/graphql';
import { COMMENTS_PAGE_SIZE } from '../../lib/constants';
import { useCurrentUser } from '../../lib/hooks/use-current-user';
import { useMessageHandler } from '../../lib/hooks/use-message';
import CustomLink from '../common/CustomLink';
import LoadingSpinner from '../common/LoadingSpinner';
import LoadMore from '../common/LoadMore';
import ArticleComment from './ArticleComment';
import CommentForm from './CommentForm';

export default function CommentSection({ article }: { article: ArticleViewFragment }) {
  const { user, loading: userLoading } = useCurrentUser();
  const { message, error, info } = useMessageHandler();

  const fallbackMessage = 'Could not load comments... ';
  const noArticlesMessage = 'No comments here... yet';
  const { data, fetchMore, networkStatus } = useCommentsQuery({
    variables: { articleId: article.id, offset: 0, limit: COMMENTS_PAGE_SIZE },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    onError: () => error({ content: fallbackMessage, mode: 'toast' }),
    onCompleted: (data) => {
      if (data && data.comments.length === 0) info({ content: noArticlesMessage, mode: 'none' });
    },
  });

  const comments = data?.comments;
  const last = comments && comments.length && comments[data.comments.length - 1].id;
  const loading = networkStatus === NetworkStatus.loading;
  const loadMoreLoading = networkStatus === NetworkStatus.fetchMore;

  const [fetchedSize, setFetchedSize] = useState(COMMENTS_PAGE_SIZE);
  const onLoadMore = useCallback(
    async ({ offset, cursor }: { offset: number; cursor: number }) => {
      const { data } = await fetchMore({
        variables: { articleId: article.id, offset, cursor, limit: COMMENTS_PAGE_SIZE },
      });
      setFetchedSize(data.comments.length);
    },
    [article, fetchMore]
  );
  return (
    <div className='p-4 bg-gray-50 '>
      <div className='container flex flex-col items-center mx-auto'>
        <div className='w-full sm:w-8/12'>
          {!userLoading && (
            <>
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
            </>
          )}
          {loading && <LoadingSpinner />}

          <ul className='mt-4'>
            {data?.comments.map((comment) => (
              <li key={comment.id}>
                <ArticleComment comment={comment} />
              </li>
            ))}
          </ul>
          <LoadMore {...{ last, fetchedSize, onLoadMore, loadMoreLoading }} />
        </div>
      </div>
    </div>
  );
}
