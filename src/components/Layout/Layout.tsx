import { Outlet } from 'react-router-dom';
import { useUser } from '@/lib/auth';

const Layout = () => {
  const { data: user } = useUser();

  return (
    <>
      {user && <p>Sono Loggato!</p>}
      {!user && <p>Non Sono Loggato!</p>}
      <Outlet />
    </>
  );
};

export default Layout;
