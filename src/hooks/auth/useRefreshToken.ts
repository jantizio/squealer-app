import { privateApi } from '@/lib/utils';
import useAuth from './useAuth';

export default function useRefreshToken() {
  const { setAuth } = useAuth();

  return async () => {
    const { data: newToken } = await privateApi.post<string>('/token/refresh');

    setAuth((prev) => {
      console.log(prev);
      console.log(newToken);
      if (!prev) return null;
      return {
        ...prev,
        token: newToken,
      };
    });

    return newToken;
  };
}
