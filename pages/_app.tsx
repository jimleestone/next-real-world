import type { AppProps } from 'next/app';
import Layout from '../components/common/Layout';
import { CustomApolloProvider } from '../lib/hooks/use-apollo';
import { MessageProvider } from '../lib/hooks/use-message';
import { TokenProvider } from '../lib/hooks/use-token';
import { ToolsProvider } from '../lib/hooks/use-tools';
import Compose from '../lib/utils/compose';
import '../styles/global.css';

function MyApp(appProps: AppProps) {
  return (
    <Compose components={[ToolsProvider, TokenProvider, CustomApolloProvider, MessageProvider]}>
      <Layout {...appProps} />
    </Compose>
  );
}

export default MyApp;
