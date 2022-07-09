import React from 'react';

export function ContainerPage({ children }: { children: React.ReactNode }) {
  return (
    <div className='container page'>
      <div className='row'> {children} </div>
    </div>
  );
}
