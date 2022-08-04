import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import seo from '../../lib/seo';
import Footer from './Footer';
import Header from './Header';
import Toast from './toast';

export default function Layout({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...seo} />
      <div className='flex flex-col h-screen'>
        <Header />
        <Component {...pageProps} />
        <Footer />
        <Toast />
      </div>
    </>
  );
}
