import { useIsAuthenticated } from '@/hooks/useIsAuthenticated';
import { AnonymousHome } from './AnonymousHome';
import { LoggedHome } from './LoggedHome';

export const Homepage = () => {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) return <LoggedHome />;
  else return <AnonymousHome />;
};
