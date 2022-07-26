import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { UrlObject } from 'url';

interface CustomLinkProps {
  href: string | UrlObject;
  children: React.ReactNode;
  className?: string;
  as?: string | UrlObject;
  shallow?: boolean;
  replace?: boolean;
  underlined?: boolean;
  mode?: 'none' | 'primary' | 'secondary' | 'reverse' | 'nav' | 'tab' | 'tag';
}

const linkConfig = {
  none: { basic: '', hover: '', active: '' },
  nav: {
    basic: 'block p-2 text-gray-400 border-b border-gray-100 md:border-0 md:p-0',
    hover: 'hover:bg-gray-50 hover:text-gray-700 md:hover:bg-transparent',
    active: 'text-gray-900 hover:text-black',
  },
  tab: {
    basic: 'p-4 rounded-t-lg text-gray-400 bg-gray-50',
    hover: 'hover:text-gray-700 hover:border-b-2 hover:border-gray-300',
    active: 'text-primary border-b-2 border-primary hover:text-primary-600 hover:border-primary-600',
  },
  tag: {
    basic: '',
    hover: '', // basically defined in the Tab component
    active: 'underline bg-gray-600',
  },
  primary: {
    basic: 'text-primary',
    hover: 'hover:text-primary-600',
    active: '',
  },
  secondary: {
    basic: 'text-gray-500',
    hover: 'hover:text-gray-600',
    active: '',
  },
  reverse: {
    basic: 'text-gray-100',
    hover: 'hover:text-white',
    active: '',
  },

  underline: 'hover:underline',
};

export default function CustomLink({
  className,
  href,
  as,
  shallow,
  replace,
  underlined = false,
  mode = 'none',
  children,
}: CustomLinkProps) {
  const { asPath } = useRouter();
  const active = decodeURIComponent(asPath) === decodeURIComponent(href as string);
  const ariaCurrent = active ? 'page' : undefined;

  return (
    <Link href={href} as={as} passHref shallow={shallow} replace={replace}>
      <a
        aria-current={ariaCurrent}
        className={`
        ${linkConfig[mode].basic} 
        ${linkConfig[mode].hover} 
        ${active && linkConfig[mode].active} 
        ${underlined && linkConfig.underline} 
        ${className}`}
      >
        {children}
      </a>
    </Link>
  );
}
