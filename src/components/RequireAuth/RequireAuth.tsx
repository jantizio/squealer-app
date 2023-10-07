import useAuth from '@/hooks/auth/useAuth';
import { getUser } from '@/lib/axios';
import { userType_t } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

type RequireAuthProps = {
  allowedRoles: userType_t[];
  loginPath: string;
  unauthorizedPath: string;
};

const RequireAuth = ({
  allowedRoles,
  loginPath,
  unauthorizedPath,
}: RequireAuthProps) => {
  const [cookies] = useCookies(['logged_in']);
  const { dispatch } = useAuth();
  const location = useLocation();

  const {
    isLoading,
    isFetching,
    data: user,
  } = useQuery(['authUser'], getUser, {
    retry: 1,
    onSuccess: (data) => {
      dispatch({ type: 'SET_USER', payload: data });
    },
  });

  if (isLoading || isFetching) {
    return <p>loading...</p>;
  }

  // TODO: puzza questo codice
  return (cookies.logged_in || user) &&
    allowedRoles.includes(user?.type as string) ? (
    <Outlet />
  ) : cookies.logged_in && user ? (
    <Navigate to={unauthorizedPath} state={{ from: location }} replace />
  ) : (
    <Navigate to={loginPath} state={{ from: location }} replace />
  );
};

export default RequireAuth;
