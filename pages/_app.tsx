import type { AppProps } from 'next/app';
import { CustomApolloProvider } from '../lib/hooks/use-apollo';
import { TokenProvider } from '../lib/hooks/use-token';
import Container from './_container';

function MyApp(appProps: AppProps) {
  return (
    <TokenProvider>
      <CustomApolloProvider>
        <Container {...appProps} />
      </CustomApolloProvider>
    </TokenProvider>
  );
}

export default MyApp;
