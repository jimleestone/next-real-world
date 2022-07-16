import type { AppProps } from 'next/app';
import React from 'react';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useCurrentUser } from '../lib/hooks/use-current-user';

function Container({ Component, pageProps }: AppProps) {
  const { user, loading } = useCurrentUser();
  if ((pageProps.protected && !user) || (pageProps.guestOnly && user)) return <LoadingSpinner />;
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

export default Container;
