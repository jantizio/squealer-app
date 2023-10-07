import { Navigate, RouteObject } from 'react-router-dom';

import AnonymousHome from '@/components/Homepage/AnonymousHome';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import Channel from '@/components/Channel';
import Unauthorized from '@/components/Unauthorized';
import Layout from '@/components/Layout';

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <AnonymousHome /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
