interface LoadMoreProps {
  totalCount: number;
  currentSize: number;
  onLoadMore: () => void;
}

export default function LoadMore({ totalCount, currentSize, onLoadMore }: LoadMoreProps) {
  const noMore = totalCount <= currentSize;
  return (
    <nav>
      <button
        className={`btn btn-sm ${noMore ? 'btn-secondary' : 'btn-outline-primary'}`}
        disabled={noMore}
        onClick={onLoadMore}
      >
        {noMore ? 'No More' : 'Load More...'}
      </button>
    </nav>
  );
}
