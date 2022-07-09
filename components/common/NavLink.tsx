import Link from 'next/link';
import { useRouter } from 'next/router';
import { UrlObject } from 'url';

interface NavLinkProps {
  href: string | UrlObject;
  as?: string;
  children: React.ReactNode;
}

const NavLink = ({ href, as, children }: NavLinkProps) => {
  const { asPath } = useRouter();
  return (
    <Link href={href} as={as} passHref>
      <a className={`nav-link ${asPath === href && `active`}`}>{children}</a>
    </Link>
  );
};

export default NavLink;
