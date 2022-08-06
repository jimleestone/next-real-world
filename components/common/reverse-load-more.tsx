import { ReactNode, useCallback } from 'react';
import { useCountdown, useEventListener } from 'usehooks-ts';
import { ARTICLES_FETCH_MORE_INTERVAL, ARTICLES_PAGE_SIZE } from '../../lib/constants';
import CustomButton from './CustomButton';
import LoadingSpinner from './LoadingSpinner';
import { BaseLoadMoreProps } from './LoadMore';

type ReverseLoadMoreProps = {
  topFetchedSize: number;
  bottomFetchedSize: number;
  topLoading: boolean;
  bottomLoading: boolean;
  children?: ReactNode;
} & BaseLoadMoreProps;

export default function ReverseLoadMore({
  first,
  last,
  onLoadMore,
  loadMoreLoading,
  children,
  topFetchedSize,
  bottomFetchedSize,
  topLoading,
  bottomLoading,
}: ReverseLoadMoreProps) {
  const bottomNoMore = bottomFetchedSize < ARTICLES_PAGE_SIZE;
  const topNoMore = topFetchedSize < ARTICLES_PAGE_SIZE;
  const [count, { startCountdown, resetCountdown }] = useCountdown({ countStart: ARTICLES_FETCH_MORE_INTERVAL });

  const handleScrollToBottom = useCallback(() => {
    if (last && !bottomNoMore && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
      onLoadMore({ offset: 1, cursor: last });
    }
  }, [onLoadMore, last, bottomNoMore]);

  const handleScrollToTop = useCallback(() => {
    if (topNoMore) startCountdown();
    if (first && window.scrollY === 0 && (!topNoMore || count === 0)) {
      onLoadMore({ offset: -1, cursor: first }); // load more and prepend to the list top
      resetCountdown();
      startCountdown();
    }
  }, [onLoadMore, first, topNoMore, count, startCountdown, resetCountdown]);

  useEventListener('scroll', handleScrollToBottom);
  useEventListener('scroll', handleScrollToTop);

  return (
    <div className=' flex flex-col justify-between relative'>
      {loadMoreLoading && topLoading && <LoadingSpinner nowrap overlay />}
      {children}
      {loadMoreLoading && bottomLoading && !bottomNoMore && <LoadingSpinner nowrap />}
      <nav className='flex mt-4'>
        {bottomNoMore && (
          <CustomButton color='secondary' outlined size='s' disabled>
            No More
          </CustomButton>
        )}
      </nav>
    </div>
  );
}
