import Link from 'next/link';
import { useRouter } from 'next/router';
import { UrlObject } from 'url';

interface NavLinkProps {
  href: string | UrlObject;
  as?: string | UrlObject;
  shallow?: boolean;
  children: React.ReactNode;
  className?: string;
  hoverClass?: string;
  activeClass?: string;
}

export default function NavLink({ href, as, className, hoverClass, activeClass, shallow, children }: NavLinkProps) {
  const { asPath } = useRouter();
  const active = decodeURIComponent(asPath) === decodeURIComponent(href as string);
  const ariaCurrent = active ? 'page' : undefined;
  return (
    <Link href={href} as={as} passHref shallow={shallow}>
      <a className={`${className} ${hoverClass} ${active ? activeClass : ''}`} aria-current={ariaCurrent}>
        {children}
      </a>
    </Link>
  );
}
