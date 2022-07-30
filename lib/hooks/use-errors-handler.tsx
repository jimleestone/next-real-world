import { ApolloError, useApolloClient } from '@apollo/client';
import { createContext, useCallback, useContext, useState } from 'react';
import { usePush } from './use-router-methods';
import { useToken } from './use-token';

enum ServerErrorCode {
  Unauthorized = 'UNAUTHENTICATED',
  BadUserInput = 'BAD_USER_INPUT',
  InternalServerError = 'INTERNAL_SERVER_ERROR',
}

interface ErrorsContext {
  errors: string;
  toasting: string;
  handleErrors: ({ graphQLErrors, networkError }: ApolloError, toasting?: boolean) => void;
  dismiss: () => void;
}

const initErrorsContext: ErrorsContext = {
  errors: '',
  toasting: '',
  handleErrors: ({ graphQLErrors, networkError }: ApolloError) => {},
  dismiss: () => {},
};

const errorsContext = createContext<ErrorsContext>(initErrorsContext);

/**
 * @deprecated
 */
export function ErrorsProvider({ children }: { children: React.ReactNode }) {
  const errorsHandler = useProvideErrorsHandler();
  return <errorsContext.Provider value={errorsHandler}>{children}</errorsContext.Provider>;
}

/**
 * @deprecated
 */
export const useErrorsHandler = () => {
  return useContext(errorsContext);
};

function useProvideErrorsHandler() {
  const [errors, setErrors] = useState<string>('');
  const [toasting, setToasting] = useState<string>('');
  const { token, handleChangeToken } = useToken();
  const client = useApolloClient();
  const push = usePush();

  const dismiss = useCallback(() => {
    setErrors('');
    setToasting('');
  }, []);

  const handleErrors = useCallback(
    ({ graphQLErrors, networkError }: ApolloError, toasting?: boolean) => {
      const reset = async () => {
        handleChangeToken('');
        await client.resetStore();
        push('/login');
      };

      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          switch (err.extensions.code) {
            case ServerErrorCode.Unauthorized:
              if (token) reset(); // invalid token push to login
              break;
            default:
              if (toasting) setToasting(err.message);
              else setErrors(err.message);
              break;
          }
        }
      }
    },
    [token, handleChangeToken, push, client]
  );
  return { errors, toasting, handleErrors, dismiss };
}
