import { UrlObject } from 'url';
import NavLink from './NavLink';

export default function NavItem({ text, href, icon }: { text: string; href: string | UrlObject; icon?: string }) {
  return (
    <li className='nav-item'>
      <NavLink href={href}>
        {icon && <i className={icon}></i>}&nbsp;
        {text}
      </NavLink>
    </li>
  );
}
