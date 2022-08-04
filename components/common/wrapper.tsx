import { NextSeo, NextSeoProps } from 'next-seo';
import { ReactNode } from 'react';
import { useMessageHandler } from '../../lib/hooks/use-message';
import LoadingSpinner from './LoadingSpinner';

type WrapperProps = {
  children: ReactNode;
} & NextSeoProps;

export default function Wrapper({ children, ...props }: WrapperProps) {
  const { dismissing } = useMessageHandler();
  if (dismissing) return <LoadingSpinner />;
  return (
    <>
      <NextSeo {...props} />
      <div className='flex-2 mt-14 md:mt-12'>{children}</div>
    </>
  );
}
