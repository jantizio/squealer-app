import { useIsAuthenticated } from 'react-auth-kit';
import AnonymousHome from './AnonymousHome';
import LoggedHome from './LoggedHome';

function Homepage() {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated()) return <LoggedHome />;
  else return <AnonymousHome />;
}

export default Homepage;
