import { useTagsQuery } from '../../generated/graphql';
import LoadingSpinner from '../common/LoadingSpinner';
import TagList from '../common/TagList';

export default function HomeSidebar() {
  const { loading, data } = useTagsQuery();
  if (loading) return <LoadingSpinner />;
  return (
    <div className='p-2 bg-gray-200 rounded-sm mb-4'>
      <p className='mb-2 font-semibold'>Popular Tags</p>
      {data && <TagList tagList={data.tags} withLink size='s' />}
    </div>
  );
}
