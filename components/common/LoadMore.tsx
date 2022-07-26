import CustomButton from './CustomButton';

interface LoadMoreProps {
  totalCount: number;
  currentSize: number;
  onLoadMore: () => void;
}

export default function LoadMore({ totalCount, currentSize, onLoadMore }: LoadMoreProps) {
  const noMore = totalCount <= currentSize;
  return (
    <nav className='flex'>
      <CustomButton color='primary' outlined size='s' disabled={noMore} onClick={onLoadMore}>
        {noMore ? 'No More' : 'Load More...'}
      </CustomButton>
    </nav>
  );
}
