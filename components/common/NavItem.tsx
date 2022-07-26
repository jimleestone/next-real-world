import { UrlObject } from 'url';
import CustomLink from './CustomLink';

interface NavItemProps {
  text: string;
  href: string | UrlObject;
  icon?: string;
}

export default function NavItem({ text, href, icon }: NavItemProps) {
  return (
    <li>
      <CustomLink href={href} mode='nav'>
        {icon && <i className={icon}></i>}&nbsp;
        {text}
      </CustomLink>
    </li>
  );
}
