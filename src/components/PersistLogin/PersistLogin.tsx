import useAuth from '@/hooks/auth/useAuth';
import useRefreshToken from '@/hooks/auth/useRefreshToken';
import { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();
  const effectRan = useRef(false);

  useEffect(() => {
    if (!effectRan.current) {
      const verifyRefreshToken = async () => {
        try {
          await refresh();
        } catch (err) {
          if (err instanceof AxiosError) {
            const { stack, ...rest } = err;
            console.log(rest);
          } else console.log(err);
        } finally {
          setIsLoading(false);
        }
      };

      !auth?.token && persist ? verifyRefreshToken() : setIsLoading(false);
      return () => {
        effectRan.current = true;
      };
    }
  }, []);

  return <>{!persist || !isLoading ? <Outlet /> : <p>Loading...</p>}</>;
};

export default PersistLogin;
