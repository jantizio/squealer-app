import useAuth from '@/hooks/auth/useAuth';

export default function useIsAuthenticated() {
  const { auth } = useAuth();

  return auth !== null;
}
