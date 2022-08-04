import { useCallback } from 'react';
import { useCountdown, useEventListener } from 'usehooks-ts';
import { usePrevious } from '../../lib/hooks/use-previous';
import CustomButton from './CustomButton';
import LoadingSpinner from './LoadingSpinner';
import { LoadMoreProps } from './LoadMore';

export default function ReverseLoadMore({ first, last, currentSize = 0, onLoadMore, loadMoreLoading }: LoadMoreProps) {
  const prevSize = usePrevious(currentSize);
  const fetchedSize = currentSize - (prevSize ?? 0);
  const noMore = fetchedSize < 10;
  const [count, { startCountdown, resetCountdown }] = useCountdown({ countStart: 15 });

  const handleScrollToBottom = useCallback(() => {
    if (last && !noMore && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
      onLoadMore({ offset: 1, cursor: last });
    }
  }, [onLoadMore, last, noMore]);

  const handleScrollToTop = useCallback(() => {
    if (noMore) startCountdown();
    if (first && window.scrollY === 0 && (!noMore || count === 0)) {
      onLoadMore({ offset: -1, cursor: first }); // load more and prepend to the list top
      resetCountdown();
      startCountdown();
    }
  }, [onLoadMore, first, noMore, count, startCountdown, resetCountdown]);

  useEventListener('scroll', handleScrollToBottom);
  useEventListener('scroll', handleScrollToTop);

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
