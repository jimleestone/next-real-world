import { useEffect } from 'react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useCurrentUser } from '../hooks/use-current-user';
import { useReplace } from '../hooks/use-router-methods';

export default function guestOnly(Component: any) {
  const GuestComponent = () => {
    const replace = useReplace();
    const { user, loading } = useCurrentUser();
    useEffect(() => {
      if (!loading && user) replace('/');
    }, [user, loading, replace]);
    if (loading) return <LoadingSpinner />;
    return !user ? <Component /> : <LoadingSpinner />;
  };
  return GuestComponent;
}
