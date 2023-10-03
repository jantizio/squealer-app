import AnonymousHome from './AnonymousHome';
import LoggedHome from './LoggedHome';
import useIsAuthenticated from '@/hooks/auth/useIsAuthenticated';

function Homepage() {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) return <LoggedHome />;
  else return <AnonymousHome />;
}

export default Homepage;
