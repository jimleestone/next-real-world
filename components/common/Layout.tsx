import type { AppProps } from 'next/app';
import React from 'react';
import { useCurrentUser } from '../../lib/hooks/use-current-user';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ Component, pageProps }: AppProps) {
  const { loading } = useCurrentUser();
  return (
    <>
      {!loading && (
        <React.Fragment>
          <Header />
          <Component {...pageProps} />;
          <Footer />
        </React.Fragment>
      )}
    </>
  );
}
