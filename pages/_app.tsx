import type { AppProps } from 'next/app';
import Layout from '../components/common/Layout';
import { CustomApolloProvider } from '../lib/hooks/use-apollo';
import { TokenProvider } from '../lib/hooks/use-token';

function MyApp(appProps: AppProps) {
  return (
    <TokenProvider>
      <CustomApolloProvider>
        <Layout {...appProps} />
      </CustomApolloProvider>
    </TokenProvider>
  );
}

export default MyApp;
