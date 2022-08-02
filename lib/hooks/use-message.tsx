import { ApolloError, useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { usePush } from './use-router-methods';
import { useToken } from './use-token';

export type MessageType = 'error' | 'info' | 'success';
export type NotifyType = 'alert' | 'toast' | 'none';
export interface Message {
  content: string;
  type: MessageType;
  mode: NotifyType;
}

enum ServerErrorCode {
  Unauthorized = 'UNAUTHENTICATED',
  BadUserInput = 'BAD_USER_INPUT',
  InternalServerError = 'INTERNAL_SERVER_ERROR',
}

interface MessageContext {
  message: Message | null;
  handleErrors: ({ err, mode }: { err: ApolloError; mode: NotifyType }) => void;
  dismiss: () => void;
  dismissing: boolean;
  success: (message: Pick<Message, 'content' | 'mode'>) => void;
  error: (message: Pick<Message, 'content' | 'mode'>) => void;
  info: (message: Pick<Message, 'content' | 'mode'>) => void;
}

const initMessageContext: MessageContext = {
  message: null,
  handleErrors: () => {},
  dismiss: () => {},
  dismissing: false,
  success: () => {},
  error: () => {},
  info: () => {},
};

const messageContext = createContext<MessageContext>(initMessageContext);

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const messageHandler = useProvideMessageHandler();
  return <messageContext.Provider value={messageHandler}>{children}</messageContext.Provider>;
}

export const useMessageHandler = () => {
  return useContext(messageContext);
};

function useProvideMessageHandler() {
  const [message, setMessage] = useState<Message | null>(null);
  const { token, handleChangeToken } = useToken();
  const client = useApolloClient();
  const push = usePush();
  const { asPath } = useRouter();
  const [dismissing, setDismissing] = useState<boolean>(false);

  useEffect(() => {
    const onMount = () => {
      setDismissing(true);
      setMessage(null); // dismiss when path changed
      setDismissing(false);
    };
    onMount();
    return () => setDismissing(false);
  }, [asPath]);

  const success = useCallback(({ content, mode }: Pick<Message, 'content' | 'mode'>) => {
    setMessage({ content, mode, type: 'success' });
  }, []);

  const error = useCallback(({ content, mode }: Pick<Message, 'content' | 'mode'>) => {
    setMessage({ content, mode, type: 'error' });
  }, []);

  const info = useCallback(({ content, mode }: Pick<Message, 'content' | 'mode'>) => {
    setMessage({ content, mode, type: 'info' });
  }, []);

  const dismiss = useCallback(() => {
    setMessage(null);
  }, []);

  const handleErrors = useCallback(
    ({ err: { graphQLErrors, networkError }, mode }: { err: ApolloError; mode: NotifyType }) => {
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
              setMessage({ content: err.message, mode, type: 'error' });
              break;
          }
        }
        if (networkError) setMessage({ content: networkError.message, mode, type: 'error' });
      }
    },
    [token, handleChangeToken, push, client]
  );
  return { message, handleErrors, dismiss, dismissing, success, info, error };
}
