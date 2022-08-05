import { useEffect } from 'react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useCurrentUser } from '../hooks/use-current-user';
import { usePush } from '../hooks/use-router-methods';

export default function withAuth(Component: any) {
  const AuthenticatedComponent = () => {
    const push = usePush();
    const { user, loading } = useCurrentUser();
    useEffect(() => {
      if (!loading && !user) push('/login');
    }, [user, loading, push]);
    return user ? <Component {...{ user }} /> : <LoadingSpinner />;
  };
  return AuthenticatedComponent;
}
