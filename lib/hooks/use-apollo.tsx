import { ApolloClient, ApolloLink, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React, { useMemo, useRef } from 'react';
import { cache } from '../cache';
import { cacheLink, errorLink, httpLink } from '../client/apollo-client';
import { useToken } from './use-token';

export function CustomApolloProvider({ children }: { children: React.ReactNode }) {
  const { token } = useToken();
  const tokenRef = useRef<string>();

  // Whenever the token changes, the component re-renders, thus updating the ref.
  tokenRef.current = token;

  // Ensure that the client is only created once.
  const client = useMemo(() => {
    const authLink = setContext((_, { headers }) => ({
      headers: {
        ...headers,
        authorization: tokenRef.current ? `Bearer ${tokenRef.current}` : '',
      },
    }));

    return new ApolloClient({
      link: ApolloLink.from([errorLink, authLink, cacheLink, httpLink]),
      connectToDevTools: process.env.NODE_ENV === 'development',
      cache,
    });
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
