import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '@/hooks/auth/useAuth';
import { run } from '@/lib/utils';
import { userType_t } from '@/lib/types';

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
  const { auth } = useAuth();
  const location = useLocation();

  return run(() => {
    if (!auth?.token)
      return <Navigate to={loginPath} state={{ from: location }} replace />;
    else if (allowedRoles.includes(auth.authState.type)) return <Outlet />;
    else
      return (
        <Navigate to={unauthorizedPath} state={{ from: location }} replace />
      );
  });
};

export default RequireAuth;
