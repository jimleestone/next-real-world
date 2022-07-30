import type { AppProps } from 'next/app';
import { useCurrentUser } from '../../lib/hooks/use-current-user';
import { useMessageHandler } from '../../lib/hooks/use-message';
import Footer from './Footer';
import Header from './Header';
import Toast from './toast';

export default function Layout({ Component, pageProps }: AppProps) {
  const { loading } = useCurrentUser();
  const { dismissing } = useMessageHandler();
  return (
    <>
      {!loading && !dismissing && (
        <div className='flex flex-col h-screen'>
          <Header />
          <Component {...pageProps} />
          <Footer />
          <Toast />
        </div>
      )}
    </>
  );
}
