import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { joinStylesFromArray } from '../../lib/utils/styles-builder';

export type LinkType = 'none' | 'primary' | 'secondary' | 'reverse' | 'nav' | 'tab' | 'tag';
type LinkPattern = 'basic' | 'hover' | 'active';

export type CustomLinkProps = Partial<{
  children: React.ReactNode;
  className: string;
  underlined: boolean;
  mode: LinkType;
}> &
  LinkProps;

const linkConfig = {
  basic: '',
  underline: 'hover:underline',
};

const linkTypeConfig: { [key in LinkType]: Partial<{ [key in LinkPattern]: string }> } = {
  none: {},
  nav: {
    basic: 'block p-2 text-gray-400 border-b border-gray-100 md:border-0 md:p-0',
    hover: 'hover:bg-gray-50 hover:text-gray-700 md:hover:bg-transparent',
    active: 'cursor-default text-gray-900 hover:text-black',
  },
  tab: {
    basic:
      'flex p-2 sm:p-4 rounded-t-lg text-gray-400 bg-gray-50 max-w-tab whitespace-nowrap text-sm sm:text-base font-medium',
    hover: 'hover:text-gray-700 hover:border-b-2 hover:border-gray-300',
    active: 'cursor-default text-primary border-b-2 border-primary hover:text-primary-600 hover:border-primary-600',
  },
  tag: {
    active: 'cursor-default underline bg-gray-600',
  },
  primary: {
    basic: 'text-primary',
    hover: 'hover:text-primary-600',
  },
  secondary: {
    basic: 'text-gray-500',
    hover: 'hover:text-gray-600',
  },
  reverse: {
    basic: 'text-gray-100',
    hover: 'hover:text-white',
  },
};

const joinLinkStyles = (
  { mode, underlined, className }: Pick<CustomLinkProps, 'mode' | 'underlined' | 'className'>,
  active: boolean
) =>
  joinStylesFromArray(
    linkConfig.basic,
    mode && linkTypeConfig[mode].basic,
    mode && linkTypeConfig[mode].hover,
    active && mode && linkTypeConfig[mode].active,
    underlined && linkConfig.underline,
    className
  );

export default function CustomLink({
  href,
  className,
  underlined = false,
  mode = 'none',
  children,
  ...props
}: CustomLinkProps) {
  const { asPath } = useRouter();
  const active = decodeURIComponent(asPath) === decodeURIComponent(href as string);
  return (
    <Link href={href} {...props}>
      <a className={joinLinkStyles({ mode, underlined, className }, active)}>{children}</a>
    </Link>
  );
}
