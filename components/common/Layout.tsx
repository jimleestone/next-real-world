import type { AppProps } from 'next/app';
import { useCurrentUser } from '../../lib/hooks/use-current-user';
import Footer from './Footer';
import Header from './Header';
import Toast from './toast';

export default function Layout({ Component, pageProps }: AppProps) {
  const { loading } = useCurrentUser();
  return (
    <>
      {!loading && (
        <div className='flex flex-col h-screen justify-between'>
          <Header />
          <Component {...pageProps} />;
          <Footer />
          <Toast />
        </div>
      )}
    </>
  );
}
