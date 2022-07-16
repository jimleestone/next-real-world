import Link from 'next/link';
import React from 'react';
import { UrlObject } from 'url';

interface CustomLinkProps {
  href: string | UrlObject;
  children: React.ReactNode;
  className?: string;
  as?: string | UrlObject;
  shallow?: boolean;
}

const CustomLink = ({ className, href, as, shallow, children }: CustomLinkProps) => (
  <Link href={href} as={as} passHref shallow={shallow}>
    <a className={className || ''}>{children}</a>
  </Link>
);

export default CustomLink;
