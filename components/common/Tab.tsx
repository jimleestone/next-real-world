import { UrlObject } from 'url';
import NavLink from './NavLink';

export default function Tab({ name, href, as }: { name: string; href: string | UrlObject; as?: string | UrlObject }) {
  return (
    <li className='nav-item'>
      <NavLink href={href} as={as}>
        {name}
      </NavLink>
    </li>
  );
}
