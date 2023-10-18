import { useUser } from '@/lib/auth';
import type { userRead_t } from '@/utils/types';
import { createContext, useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const CurrentUserContext = createContext<userRead_t | null>(null);

export const useUserContext = () => {
  return useContext(CurrentUserContext);
};

export const CurrentUserContextProvider = () => {
  console.log('CurrentUserContextProvider');
  const currentUserQuery = useUser();
  const location = useLocation();

  // if is loading show loading page
  if (currentUserQuery.isLoading) {
    return <p>Sto caricando...</p>;
  }

  // if error show error page
  if (currentUserQuery.isError) {
    return (
      <p>
        Data: {JSON.stringify(currentUserQuery?.data !== null)},{' '}
        {JSON.stringify(currentUserQuery.data)}, Errore:{' '}
        {currentUserQuery.error instanceof Error &&
          currentUserQuery.error.message}
      </p>
    );
  }

  // if user is not logged in redirect to login page
  if (currentUserQuery.data === null) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <CurrentUserContext.Provider value={currentUserQuery.data}>
      <Outlet />
    </CurrentUserContext.Provider>
  );
};
