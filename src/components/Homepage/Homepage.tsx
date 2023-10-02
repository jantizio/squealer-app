import useAuth from '@/hooks/auth/useAuth';
import AnonymousHome from './AnonymousHome';
import LoggedHome from './LoggedHome';
import useIsAuthenticated from '@/hooks/auth/useIsAuthenticated';

function Homepage() {
  // const isAuthenticated = useIsAuthenticated();
  const { state } = useAuth();
  const isAuth = !!state.authUser;

  if (isAuth) return <LoggedHome />;
  else return <AnonymousHome />;
}

export default Homepage;
