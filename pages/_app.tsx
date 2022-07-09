import type { AppProps } from 'next/app';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import { AuthProvider, CustomApolloProvider } from '../lib/hooks/use-auth';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CustomApolloProvider>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />;
        <Footer />
      </AuthProvider>
    </CustomApolloProvider>
  );
}

export default MyApp;
