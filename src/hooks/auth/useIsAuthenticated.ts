import { useCookies } from 'react-cookie';

export default function useIsAuthenticated() {
  const [cookies] = useCookies(['logged_in']);

  return !!cookies.logged_in;
}
