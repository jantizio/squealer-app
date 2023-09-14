import useAuth from '@/hooks/auth/useAuth';

const useAuthUser = () => {
  const { auth } = useAuth();

  if (!auth) return null;
  return auth.authState;
};

export default useAuthUser;
