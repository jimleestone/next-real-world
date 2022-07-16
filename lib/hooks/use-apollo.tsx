import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { sha256 } from 'crypto-hash';
import React, { useMemo, useRef } from 'react';
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

    const cacheLink = createPersistedQueryLink({
      sha256,
      useGETForHashedQueries: true,
    });

    const httpLink = createHttpLink({
      uri: '/api',
    });

    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );
      }
      if (networkError) console.log(`[Network error]: ${networkError.message}`);
    });

    return new ApolloClient({
      link: ApolloLink.from([errorLink, authLink, cacheLink, httpLink]),
      connectToDevTools: process.env.NODE_ENV === 'development',
      cache: new InMemoryCache({
        typePolicies: {
          Article: {
            keyFields: ['id'],
          },
          Comment: {
            keyFields: ['id'],
          },
          Profile: {
            keyFields: ['username'],
          },
          AuthUser: {
            keyFields: ['id'],
          },
          Tag: {
            keyFields: ['name'],
          },
          Query: {
            fields: {
              feed: {
                keyArgs: [],
                merge(existing: any[], incoming: any[], { args, readField }) {
                  const offset = args?.offset as number;
                  const merged = existing ? existing.slice(0) : [];
                  const existingIdSet = new Set(merged.map((article) => readField('id', article)));
                  incoming = incoming.filter((article) => !existingIdSet.has(readField('id', article)));
                  for (let i = 0; i < incoming.length; ++i) {
                    merged[offset + i] = incoming[i];
                  }
                  return merged;
                },
              },
              articles: {
                keyArgs: ['author', 'favorited', 'tag'],
                merge(existing: any[], incoming: any[], { args, readField }) {
                  const offset = args?.offset as number;
                  const merged = existing ? existing.slice(0) : [];
                  const existingIdSet = new Set(merged.map((article) => readField('id', article)));
                  incoming = incoming.filter((article) => !existingIdSet.has(readField('id', article)));
                  for (let i = 0; i < incoming.length; ++i) {
                    merged[offset + i] = incoming[i];
                  }
                  return merged;
                },
              },
            },
          },
        },
      }),
    });
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
