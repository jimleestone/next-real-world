import { useCallback } from 'react';
import { useCountdown, useEventListener } from 'usehooks-ts';
import { COMMENTS_FETCH_MORE_INTERVAL, COMMENTS_PAGE_SIZE } from '../../lib/constants';
import CustomButton from './CustomButton';
import LoadingSpinner from './LoadingSpinner';

export interface BaseLoadMoreProps {
  first?: number;
  last?: number;
  onLoadMore: ({ offset, cursor }: { offset: number; cursor: number }) => void;
  loadMoreLoading: boolean;
}

type LoadMoreProps = {
  fetchedSize: number;
} & BaseLoadMoreProps;

export default function LoadMore({ last, fetchedSize, onLoadMore, loadMoreLoading }: LoadMoreProps) {
  const noMore = fetchedSize < COMMENTS_PAGE_SIZE;
  const [count, { startCountdown, resetCountdown }] = useCountdown({ countStart: COMMENTS_FETCH_MORE_INTERVAL });

  const handleScrollToBottom = useCallback(() => {
    if (noMore) startCountdown();
    if (
      last &&
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight &&
      (!noMore || count === 0)
    ) {
      onLoadMore({ offset: 1, cursor: last });
      resetCountdown();
      startCountdown();
    }
  }, [onLoadMore, last, count, noMore, resetCountdown, startCountdown]);

  useEventListener('scroll', handleScrollToBottom);
  return (
    <>
      {loadMoreLoading && <LoadingSpinner nowrap />}
      <nav className='flex mt-4'>
        {noMore && (
          <CustomButton color='secondary' outlined size='s' disabled>
            No More
          </CustomButton>
        )}
      </nav>
    </>
  );
}
