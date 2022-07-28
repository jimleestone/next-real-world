import { ReactNode, useEffect } from 'react';
import { useErrorsHandler } from '../../lib/hooks/use-errors-handler';
import Title from './Title';

interface WrapperProps {
  title: string;
  children: ReactNode;
}

export default function Wrapper({ title, children }: WrapperProps) {
  const { dismiss } = useErrorsHandler();
  useEffect(() => {
    dismiss();
  }, [dismiss]);
  return (
    <>
      <Title title={title} />
      <div className='mb-auto'>{children}</div>
    </>
  );
}
