import { LinkProps } from 'next/link';
import CustomLink from './CustomLink';

type NavItemProps = {
  text: string;
  icon?: string;
} & LinkProps;

export default function NavItem({ text, icon, ...props }: NavItemProps) {
  return (
    <li>
      <CustomLink mode='nav' {...props}>
        {icon && <i className={icon}></i>}&nbsp;
        {text}
      </CustomLink>
    </li>
  );
}
