import { ApolloError, useApolloClient } from '@apollo/client';
import { useCallback, useState } from 'react';
import { usePush } from './use-router-methods';
import { useToken } from './use-token';

enum ServerErrorCode {
  Unauthorized = 'UNAUTHENTICATED',
  BadUserInput = 'BAD_USER_INPUT',
  InternalServerError = 'INTERNAL_SERVER_ERROR',
}

export function useErrorsHandler() {
  const [errors, setErrors] = useState<string>('');
  const { token, handleChangeToken } = useToken();
  const client = useApolloClient();
  const push = usePush();

  const handleErrors = useCallback(
    ({ graphQLErrors, networkError }: ApolloError) => {
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
              setErrors(err.message);
              break;
          }
        }
      }
    },
    [token, handleChangeToken, push, client]
  );
  return { errors, handleErrors };
}
