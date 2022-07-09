export default function TagList({ tagList }: { tagList: string[] }) {
  return (
    <ul className='tag-list'>
      {tagList?.map((tag) => (
        <li key={tag} className='tag-default tag-pill tag-outline'>
          {tag}
        </li>
      ))}
    </ul>
  );
}
