import CustomLink from './CustomLink';
import Tag from './Tag';

interface TagListProps {
  tagList: string[];
  withLink?: boolean;
  outlined?: boolean; // tag style
  onRemoveItem?: (index: number) => void;
}

export default function TagList({ tagList, withLink, outlined, onRemoveItem }: TagListProps) {
  return (
    <ul className='flex flex-wrap'>
      {tagList?.map((value, index) => (
        <Tag key={value} tagName={value} index={index} outlined={outlined} onClick={onRemoveItem}>
          {withLink ? (
            <CustomLink key={value} href={`/?tag=${value}`} shallow mode='tag'>
              {value}
            </CustomLink>
          ) : onRemoveItem ? (
            <>
              <i className='ion-close-round cursor-pointer'></i> {value}
            </>
          ) : (
            value
          )}
        </Tag>
      ))}
    </ul>
  );
}
