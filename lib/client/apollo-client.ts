import { ApolloClient, ApolloLink, createHttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { sha256 } from 'crypto-hash';
import { cache } from '../cache';
import { BASE_URL } from '../constants';

export const cacheLink = createPersistedQueryLink({
  sha256,
  useGETForHashedQueries: true,
});

export const httpLink = createHttpLink({
  uri: `${BASE_URL}/api`,
  credentials: 'same-origin',
});

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (process.env.NODE_ENV === 'development') {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      );
    }
    if (networkError) console.log(`[Network error]: ${networkError.message}`);
  }
});

export default new ApolloClient({
  link: ApolloLink.from([errorLink, cacheLink, httpLink]),
  connectToDevTools: process.env.NODE_ENV === 'development',
  cache,
  ssrMode: typeof window === 'undefined',
});
