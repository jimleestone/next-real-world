import Link from 'next/link';
import { useRouter } from 'next/router';
import { UrlObject } from 'url';

interface NavLinkProps {
  href: string | UrlObject;
  as?: string | UrlObject;
  shallow?: boolean;
  children: React.ReactNode;
}

const NavLink = ({ href, as, shallow, children }: NavLinkProps) => {
  const { asPath } = useRouter();

  return (
    <Link href={href} as={as} passHref shallow={shallow}>
      <a className={`nav-link ${decodeURIComponent(asPath) === decodeURIComponent(href as string) && `active`}`}>
        {children}
      </a>
    </Link>
  );
};

export default NavLink;
