import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Router from 'next/router';
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AuthUser, useCurrentUserLazyQuery } from '../../generated/graphql';
import { useLocalStorage } from './use-local-storage';

export function CustomApolloProvider({ children }: { children: React.ReactNode }) {
  const [token] = useLocalStorage<string>('token', '');
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

    const httpLink = createHttpLink({
      uri: '/api',
    });

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

interface AuthContext {
  user: AuthUser | null;
  loadUser: (user: AuthUser) => void;
  logout: () => void;
}
const initAuthContext: AuthContext = {
  user: null,
  loadUser: (user: AuthUser) => {},
  logout: () => {},
};

const authContext = createContext<AuthContext>(initAuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [_, setToken] = useLocalStorage<string>('token', '');
  const [loadCurrentUser] = useCurrentUserLazyQuery();

  const loadUser = (user: AuthUser) => {
    const { token, ...rest } = user;
    if (token) setToken(token);
    setUser({ ...rest });
  };

  const logout = () => {
    setToken('');
    setUser(null);
    Router.push('/');
  };

  useEffect(() => {
    let active = true;
    const load = async () => {
      await loadCurrentUser()
        .then(({ data }) => {
          if (!active) return;
          data ? setUser(data.currentUser) : setUser(null);
        })
        .catch((err) => logout());
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  return {
    user,
    loadUser,
    logout,
  };
}
