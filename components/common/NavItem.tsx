import { LinkProps } from 'next/link';
import CustomLink from './CustomLink';

export type NavItemProps = {
  text: string;
  icon?: string;
} & LinkProps;

export default function NavItem({ text, icon, ...props }: NavItemProps) {
  return (
    <CustomLink mode='nav' {...props}>
      {icon && <i className={icon}></i>}&nbsp;
      {text}
    </CustomLink>
  );
}
