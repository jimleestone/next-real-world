import { ReactNode } from 'react';
import { joinStyles } from '../../lib/utils/styles-builder';

interface TagProps {
  index: number;
  tagName: string;
  className?: string;
  outlined?: boolean;
  children?: ReactNode;
  onClick?: (index: number) => void;
}

const tagConfig = {
  basic: 'text-sm px-2 py-0.5 mr-1 mt-1 rounded-xl whitespace-nowrap',
  default: {
    color: 'text-white',
    bgColor: 'bg-gray-500 hover:bg-gray-600 focus:bg-gray-600',
  },
  outline: {
    border: 'border border-gray-300',
    color: 'text-gray-400',
    bgColor: 'bg-white',
  },
};

export default function Tag({ index, tagName, outlined, className, onClick, children }: TagProps) {
  const styles = outlined ? joinStyles(tagConfig.outline) : joinStyles(tagConfig.default);
  return (
    <li
      onClick={onClick && (() => onClick(index))}
      key={tagName}
      className={`${tagConfig.basic} ${styles} ${className}`}
    >
      {children}
    </li>
  );
}
