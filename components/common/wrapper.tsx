import { ReactNode } from 'react';
import Title from './Title';

interface WrapperProps {
  title: string;
  children: ReactNode;
}

export default function Wrapper({ title, children }: WrapperProps) {
  return (
    <>
      <Title title={title} />
      <div className='flex-2 '>{children}</div>
    </>
  );
}
