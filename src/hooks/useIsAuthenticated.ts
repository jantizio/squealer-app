import { useUser } from '@/lib/auth';

export default function useIsAuthenticated() {
  const { data } = useUser();
  return !!data;
}
