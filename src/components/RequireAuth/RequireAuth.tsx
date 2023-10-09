import { useUser } from '@/lib/auth';
import { userType_t } from '@/utils/types';
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
  const { data: user, isLoading, isFetching } = useUser();
  const location = useLocation();

  if (isLoading || isFetching) {
    return <p>loading...</p>;
  }

  // TODO: puzza questo codice
  return user && allowedRoles.includes(user.type) ? (
    <Outlet />
  ) : user ? (
    <Navigate to={unauthorizedPath} state={{ from: location }} replace />
  ) : (
    <Navigate to={loginPath} state={{ from: location }} replace />
  );
};

export default RequireAuth;
