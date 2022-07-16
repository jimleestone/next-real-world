import { useEffect, useState } from 'react';
import { useCurrentUserLazyQuery } from '../../generated/graphql';
import { useErrorsHandler } from './use-errors-handler';
import { useToken } from './use-token';

export function useCurrentUser() {
  const { token } = useToken();
  const { handleErrors } = useErrorsHandler();
  const [loading, setLoading] = useState<boolean>(true);
  const [loadCurrentUser, { data }] = useCurrentUserLazyQuery({
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-only',
    onError: (err) => handleErrors(err),
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
