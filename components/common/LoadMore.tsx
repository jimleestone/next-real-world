import { useCallback } from 'react';
import { useCountdown, useEventListener } from 'usehooks-ts';
import { usePrevious } from '../../lib/hooks/use-previous';
import CustomButton from './CustomButton';
import LoadingSpinner from './LoadingSpinner';

export interface LoadMoreProps {
  currentSize?: number;
  first?: number;
  last?: number;
  onLoadMore: ({ offset, cursor }: { offset: number; cursor: number }) => void;
  loadMoreLoading: boolean;
}

export default function LoadMore({ first, last, currentSize = 0, onLoadMore, loadMoreLoading }: LoadMoreProps) {
  const prevSize = usePrevious(currentSize);
  const fetchedSize = currentSize - (prevSize ?? 0);
  const noMore = fetchedSize < 10;
  const [count, { startCountdown, resetCountdown }] = useCountdown({ countStart: 15 });

  const handleScrollToBottom = useCallback(() => {
    if (noMore) startCountdown();
    if (last && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight && count === 0) {
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
