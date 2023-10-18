import { useUser } from '@/lib/auth';

export const useIsAuthenticated = () => {
  const { data } = useUser();
  return !!data;
};
