import { useTagsQuery } from '../../generated/graphql';

export default function HomeSidebar() {
  const { loading, data } = useTagsQuery();
  return (
    <div className='sidebar'>
      <p>Popular Tags</p>
      {loading && <span>Loading tags...</span>}
      {data && (
        <div className='tag-list'>
          {' '}
          {data.tags.map((tag: string) => (
            <a key={tag} href='#' className='tag-pill tag-default'>
              {tag}
            </a>
          ))}{' '}
        </div>
      )}
    </div>
  );
}
