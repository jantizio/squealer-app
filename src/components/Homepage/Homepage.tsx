import { useIsAuthenticated, useAuthHeader, useAuthUser } from 'react-auth-kit';

function Homepage() {
  const isAuthenticated = useIsAuthenticated();
  const authHeader = useAuthHeader();
  const auth = useAuthUser();

  console.log(auth()?.email ?? 'guest');

  if (isAuthenticated())
    return (
      <div>
        Homepage loggato, {authHeader()}, {auth()?.email ?? 'guest'}
      </div>
    );
  else return <div>Homepage non loggato</div>;
}

export default Homepage;
