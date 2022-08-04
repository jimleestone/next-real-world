import React, { createContext, useCallback, useContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';

interface TokenContext {
  token: string;
  handleChangeToken: (token: string) => void;
}

const initTokenContext: TokenContext = {
  token: '',
  handleChangeToken: (token: string) => {},
};

const tokenContext = createContext<TokenContext>(initTokenContext);

export function TokenProvider({ children }: { children: React.ReactNode }) {
  const tokenHandler = useProvideToken();
  return <tokenContext.Provider value={tokenHandler}>{children}</tokenContext.Provider>;
}

export const useToken = () => {
  return useContext(tokenContext);
};

function useProvideToken() {
  const [token, setToken] = useLocalStorage<string>('token', '');
  const handleChangeToken = useCallback(
    (token: string) => {
      setToken(token);
    },
    [setToken]
  );
  return { token, handleChangeToken };
}
