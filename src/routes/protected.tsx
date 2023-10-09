// import { Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import Settings from '@/components/Settings';
import NewSqueal from '@/components/NewSqueal';
import LoggedHome from '@/components/Homepage/LoggedHome';
import Layout from '@/components/Layout';

// import { lazyImport } from '@/lib/utils';

// const { default: LoggedHome } = lazyImport(
//   () => import('@/components/Homepage/LoggedHome'),
//   'default',
// );
// const { default: NewSqueal } = lazyImport(
//   () => import('@/components/NewSqueal'),
//   'default',
// );

// const { default: Settings } = lazyImport(
//   () => import('@/components/Settings'),
//   'default',
// );

// const App = () => {
//   return (
//     <Suspense fallback={<div>Loading</div>}>
//       <Outlet />
//     </Suspense>
//   );
// };

export const protectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <LoggedHome /> },
      { path: '/settings', element: <Settings /> },
      { path: '/create', element: <NewSqueal /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
