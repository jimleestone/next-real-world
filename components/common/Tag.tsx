import { ReactNode } from 'react';
import { joinStyles, joinStylesFromArray } from '../../lib/utils/styles-builder';

type TagType = 'default' | 'outline';
type TagSize = 's' | 'm' | 'l';
type TagColor = Required<{
  color: string;
  bgColor: string;
}>;

export type TagProps = Partial<{
  size: TagSize;
  className: string;
  outlined: boolean;
  children: ReactNode;
}>;

const tagConfig = {
  container: 'flex ml-1 mt-1 whitespace-nowrap',
  content: 'overflow-hidden',
};

const tagContainerConfig: { [key in TagSize]: string } = {
  s: 'text-sm rounded-xl pr-2 max-w-tag-s',
  m: 'text-lg rounded-2xl pr-3 max-w-tag-m',
  l: 'text-xl rounded-3xl pr-4 max-w-tag-l',
};

const tagContentConfig: { [key in TagSize]: string } = {
  s: 'pl-2 py-0.5',
  m: 'pl-3 py-1',
  l: 'pl-4 py-2',
};

const tagOutlineConfig: { [key in TagSize]: string } = {
  s: 'border',
  m: 'border-2',
  l: 'border-2',
};

const tagColorConfig: { [key in TagType]: TagColor } = {
  default: {
    color: 'text-white',
    bgColor: 'bg-gray-500 hover:bg-gray-600 focus:bg-gray-600',
  },
  outline: {
    color: 'text-gray-400 border-gray-300',
    bgColor: 'bg-white',
  },
};

const joinTagStyles = ({ size, outlined, className }: Pick<TagProps, 'size' | 'outlined' | 'className'>) =>
  joinStylesFromArray(
    tagConfig.container,
    size && tagContainerConfig[size],
    size && outlined && tagOutlineConfig[size],
    outlined ? joinStyles(tagColorConfig.outline) : joinStyles(tagColorConfig.default),
    className
  );

const joinContentStyles = ({ size }: Pick<TagProps, 'size'>) =>
  joinStylesFromArray(tagConfig.content, size && tagContentConfig[size]);

export default function Tag({ size = 'm', outlined, className, children }: TagProps) {
  return (
    <div className={joinTagStyles({ size, className, outlined })}>
      <span className={joinContentStyles({ size })}>{children}</span>
    </div>
  );
}
