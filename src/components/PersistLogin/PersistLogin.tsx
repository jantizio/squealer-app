import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '@/hooks/auth/useRefreshToken';
import useAuth from '@/hooks/auth/useAuth';
import { AxiosError } from 'axios';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      console.log('verifying refresh token');

      try {
        await refresh();
      } catch (err) {
        if (err instanceof AxiosError) {
          const { stack, ...rest } = err;
          console.log(rest);
        } else console.log();
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.token && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth?.token)}`);
  }, [isLoading]);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};

export default PersistLogin;
