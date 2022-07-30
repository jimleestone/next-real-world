import CustomLink from './CustomLink';
import Tag, { TagProps } from './Tag';

type TagListProps = {
  tagList: string[];
  withLink?: boolean;
  onRemoveItem?: (index: number) => void;
  className?: string; // justify position
} & Pick<TagProps, 'outlined' | 'size'>;

export default function TagList({ tagList, withLink, outlined, size, onRemoveItem, className }: TagListProps) {
  return (
    <ul className={`flex flex-wrap ${className}`}>
      {tagList.map((value, index) => (
        <li key={value} onClick={onRemoveItem && (() => onRemoveItem(index))}>
          <Tag {...{ size, outlined }}>
            {withLink ? (
              <CustomLink href={`/?tag=${value}`} shallow mode='tag'>
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
        </li>
      ))}
    </ul>
  );
}
