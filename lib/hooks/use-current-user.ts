import { useEffect, useState } from 'react';
import { useCurrentUserLazyQuery } from '../../generated/graphql';
import { useMessageHandler } from './use-message';
import { useToken } from './use-token';

export function useCurrentUser() {
  const { token } = useToken();
  const { handleErrors } = useMessageHandler();
  const [loading, setLoading] = useState<boolean>(true);
  const [loadCurrentUser, { data }] = useCurrentUserLazyQuery({
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-only',
    onError: (err) => handleErrors({ err, mode: 'none' }),
  });
  useEffect(() => {
    const loadData = async () => {
      if (token) await loadCurrentUser();
      setLoading(false);
    };
    loadData();
  }, [loadCurrentUser, token]);

  return { user: data?.currentUser, loading };
}
