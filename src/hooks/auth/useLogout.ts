import { backendApi } from '@/lib/utils';
import useAuth from './useAuth';

export default function useLogout() {
  const { setAuth } = useAuth();

  return async () => {
    setAuth(null);
    try {
      await backendApi.delete('/token', {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
