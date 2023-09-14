import { privateApi } from '@/lib/utils';
import { useEffect } from 'react';
import useRefreshToken from '@/hooks/auth/useRefreshToken';
import useAuth from '@/hooks/auth/useAuth';

export default function useAxios() {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = privateApi.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization'] && auth) {
          config.headers['Authorization'] = `Bearer ${auth.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = privateApi.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return privateApi(prevRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      privateApi.interceptors.request.eject(requestIntercept);
      privateApi.interceptors.response.eject(responseIntercept);
    };
  }, []);
  // TODO: non sono sicuro del dependency array

  return privateApi;
}
