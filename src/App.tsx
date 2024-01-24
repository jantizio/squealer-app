import { Channel } from '@/components/Channel';
import { CurrentUserContextProvider } from '@/components/CurrentUserContext.tsx';
import { Discover } from '@/components/Discover';
import { ErrorPage } from '@/components/ErrorPage';
import { Homepage } from '@/components/Homepage';
import { Login } from '@/components/Login';
import { NewSqueal } from '@/components/NewSqueal';
import { Profile } from '@/components/Profile';
import { ResetPassword } from '@/components/ResetPassword';
import { Settings } from '@/components/Settings';
import { Signup } from '@/components/Signup';
import { cookieOptions, tempSquealCookieKey } from '@/config';
import { cookieValidator } from '@/schema/cookieValidator';
import Cookies from 'js-cookie';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

function App() {
  /**
   * Ogni volta che l'app si carica deve controllare i cookie per gli squeal temporizzati e se ci sono fare:
   * - rinfrescare il cookie, quindi aggiornare il tempo di scadenza
   * - controllare se è il momento di inviare uno squeal e se si inviarlo
   * - aggiornare il lastupdate dello squeal
   * - rimuove gli squeal scaduti, tramite endtime
   */

  const cookie = cookieValidator.safeParse(Cookies.get(tempSquealCookieKey));

  if (cookie.success) {
    const intervalRecord: Record<string, NodeJS.Timeout> = {};
    Cookies.set(
      tempSquealCookieKey,
      JSON.stringify(cookie.data),
      cookieOptions,
    );
    for (const tempSqueal of cookie.data) {
      if (new Date() > tempSqueal.endTime) {
        // remove squeal
        clearInterval(intervalRecord[tempSqueal.referenceID]);
        delete intervalRecord[tempSqueal.referenceID];
        cookie.data = cookie.data.filter(
          (squeal) => squeal.referenceID !== tempSqueal.referenceID,
        );
      } else {
        // setup interval for squeal
        intervalRecord[tempSqueal.referenceID] = setInterval(
          () => {
            console.log('send squeal', tempSqueal.referenceID);
            if (new Date() > tempSqueal.endTime) {
              clearInterval(intervalRecord[tempSqueal.referenceID]);
              delete intervalRecord[tempSqueal.referenceID];
            }
          },
          tempSqueal.interval * 60 * 1000,
        );
      }
    }
    Cookies.set(
      tempSquealCookieKey,
      JSON.stringify(cookie.data),
      cookieOptions,
    );
  }

  return <RouterProvider router={router} />;
}

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'reset_password', element: <ResetPassword /> },
      {
        path: 'channels/',
        children: [
          { index: true, element: <Discover /> },
          { path: ':channelName', element: <Channel /> },
        ],
      },
      {
        element: <CurrentUserContextProvider />,
        children: [
          { path: 'settings', element: <Settings /> },
          { path: 'create', element: <NewSqueal /> },
          { path: 'profile', element: <Profile /> },
        ],
      },
    ],
  },
]);

export default App;
