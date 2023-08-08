import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import { backendApi } from '@/globals/utility';

export default function useAxios() {
  const authHeader = useAuthHeader();
  const isAuth = useIsAuthenticated();

  if (isAuth()) backendApi.defaults.headers.common['Authorization'] = authHeader();
  return backendApi;
}
