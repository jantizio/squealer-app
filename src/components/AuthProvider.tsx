import { createContext, useState, Dispatch, SetStateAction } from 'react';
import { authState_t } from '@/lib/types';

type AuthContextProps = {
  children: React.ReactNode;
};

type AuthContextState = {
  auth: authState_t | null;
  setAuth: Dispatch<SetStateAction<authState_t | null>>;
  persist: boolean;
  setPersist: Dispatch<SetStateAction<boolean>>;
};

const initialState = {
  auth: null,
  setAuth: () => null,
  persist: false,
  setPersist: () => null,
};

const AuthContext = createContext<AuthContextState>(initialState);

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [auth, setAuth] = useState<authState_t | null>(null);
  const [persist, setPersist] = useState(
    localStorage.getItem('persist') === 'true',
  );

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
