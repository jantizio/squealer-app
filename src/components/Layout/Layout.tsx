import { Outlet } from 'react-router-dom';
import useAuth from '@/hooks/auth/useAuth';

const Layout = () => {
  const { state } = useAuth();
  const user = state.authUser;

  return (
    <>
      {user && <p>Sono Loggato!</p>}
      {!user && <p>Non Sono Loggato!</p>}
      <Outlet />
    </>
  );
};

export default Layout;
