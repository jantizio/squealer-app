import useAuth from '@/hooks/auth/useAuth';

export default function useIsAuthenticated() {
  const { state } = useAuth();
  return !!state.authUser;
}
