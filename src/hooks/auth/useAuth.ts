import { useContext, useDebugValue } from 'react';
import AuthContext from '@/components/AuthProvider';

export default function useAuth() {
  const { auth } = useContext(AuthContext);
  useDebugValue(auth, (auth) =>
    auth?.authState.username ? 'Logged In' : 'Logged Out',
  );
  //TODO: rimuovere codice sopra
  return useContext(AuthContext);
}
