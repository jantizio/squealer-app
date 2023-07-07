import { useIsAuthenticated, useAuthHeader, useAuthUser } from 'react-auth-kit';
import AnonymousHome from './AnonymousHome';

function Homepage() {
  const isAuthenticated = useIsAuthenticated();
  const authHeader = useAuthHeader();
  const auth = useAuthUser();

  // console.log(auth()?.email ?? 'guest');

  if (isAuthenticated())
    return (
      <div>
        Homepage loggato, {authHeader()}, {auth()?.email ?? 'guest'}
      </div>
    );
  else return <AnonymousHome />;
}

export default Homepage;
