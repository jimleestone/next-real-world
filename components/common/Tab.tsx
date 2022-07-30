import { LinkProps } from 'next/link';
import CustomLink from './CustomLink';

export type TabProps = {
  name: string;
} & LinkProps;

export default function Tab({ name, ...props }: TabProps) {
  return (
    <CustomLink mode='tab' shallow {...props}>
      <span className='pr-4 overflow-hidden'>{name}</span>
    </CustomLink>
  );
}
