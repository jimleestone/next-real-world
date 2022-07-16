import { useTagsQuery } from '../../generated/graphql';
import CustomLink from '../common/CustomLink';
import LoadingSpinner from '../common/LoadingSpinner';

export default function HomeSidebar() {
  const { loading, data } = useTagsQuery();
  if (loading) return <LoadingSpinner />;
  return (
    <div className='sidebar'>
      <p>Popular Tags</p>
      {data && (
        <div className='tag-list'>
          {' '}
          {data.tags.map((tag: string) => (
            <CustomLink key={tag} href={{ pathname: '/', query: { tag } }} className='tag-pill tag-default' shallow>
              {tag}
            </CustomLink>
          ))}{' '}
        </div>
      )}
    </div>
  );
}
