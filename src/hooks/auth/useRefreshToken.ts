import { backendApi } from '@/lib/utils';
import useAuth from './useAuth';

export default function useRefreshToken() {
  const { setAuth } = useAuth();

  return async () => {
    const { data: newToken } = await backendApi.get<string>('/token/refresh', {
      withCredentials: true,
    });

    setAuth((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        token: newToken,
      };
    });

    return newToken;
  };
}
