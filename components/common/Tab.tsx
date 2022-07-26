import { UrlObject } from 'url';
import CustomLink from './CustomLink';

export interface TabProps {
  name: string;
  href: string | UrlObject;
  as?: string | UrlObject;
}

export default function Tab({ name, href, as }: TabProps) {
  return (
    <li>
      <CustomLink mode='tab' href={href} as={as} shallow>
        {name}
      </CustomLink>
    </li>
  );
}
