import type { AppProps } from 'next/app';
import Layout from '../components/common/Layout';
import { CustomApolloProvider } from '../lib/hooks/use-apollo';
import { ErrorsProvider } from '../lib/hooks/use-errors-handler';
import { TokenProvider } from '../lib/hooks/use-token';
import { ToolsProvider } from '../lib/hooks/use-tools';
import Compose from '../lib/utils/compose';
import '../styles/global.css';

function MyApp(appProps: AppProps) {
  return (
    <Compose components={[ToolsProvider, TokenProvider, CustomApolloProvider, ErrorsProvider]}>
      <Layout {...appProps} />
    </Compose>
  );
}

export default MyApp;
