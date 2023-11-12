import { Channel } from '@/components/Channel';
import { CurrentUserContextProvider } from '@/components/CurrentUserContext.tsx';
import { Discover } from '@/components/Discover';
import { ErrorPage } from '@/components/ErrorPage';
import { Homepage } from '@/components/Homepage';
import { Login } from '@/components/Login';
import { NewSqueal } from '@/components/NewSqueal';
import { Profile } from '@/components/Profile';
import { Settings } from '@/components/Settings';
import { Signup } from '@/components/Signup';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

function App() {
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
