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
import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useUpdateGeoPointMutation } from './hooks/useSqueals';

function App() {
  /**
   * Ogni volta che l'app si carica deve controllare i cookie per gli squeal temporizzati e se ci sono fare:
   * - rinfrescare il cookie, quindi aggiornare il tempo di scadenza
   * - controllare se è il momento di inviare uno squeal e se si inviarlo
   * - rimuove gli squeal scaduti, tramite endtime
   */

  const { mutate: updateGeoPoint } = useUpdateGeoPointMutation();

  useEffect(() => {
    const cookie = cookieValidator.safeParse(Cookies.get(tempSquealCookieKey));
    const intervalRecord: Record<string, NodeJS.Timeout> = {};

    if (cookie.success) {
      Cookies.set(
        tempSquealCookieKey,
        JSON.stringify(cookie.data),
        cookieOptions,
      );

      for (const timedSqueal of cookie.data) {
        if (new Date() > timedSqueal.endTime) {
          // remove squeal
          clearInterval(intervalRecord[timedSqueal.referenceID]);
          delete intervalRecord[timedSqueal.referenceID];
          cookie.data = cookie.data.filter(
            (squeal) => squeal.referenceID !== timedSqueal.referenceID,
          );
        } else {
          // setup interval for squeal
          intervalRecord[timedSqueal.referenceID] = setInterval(
            () => {
              if (new Date() > timedSqueal.endTime) {
                clearInterval(intervalRecord[timedSqueal.referenceID]);
                return;
              }
              navigator.geolocation.getCurrentPosition(
                (pos) => {
                  updateGeoPoint({
                    id: timedSqueal.referenceID,
                    coords: {
                      latitude: pos.coords.latitude,
                      longitude: pos.coords.longitude,
                    },
                  });
                },
                (err) => console.log(err),
              );
            },
            timedSqueal.interval * 60 * 1000,
          );
        }
      }

      Cookies.set(
        tempSquealCookieKey,
        JSON.stringify(cookie.data),
        cookieOptions,
      );
    }

    return () => {
      for (const interval of Object.values(intervalRecord)) {
        clearInterval(interval);
      }
    };
  }, []);

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
