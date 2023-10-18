import { Outlet } from 'react-router-dom';
import { useUser } from '@/lib/auth';

export const Layout = () => {
  const { data: user } = useUser();

  return (
    <>
      {user && <p>Sono Loggato!</p>}
      {!user && <p>Non Sono Loggato!</p>}
      <Outlet />
    </>
  );
};
