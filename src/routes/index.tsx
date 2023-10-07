import { RouteObject, useRoutes } from 'react-router-dom';

import { useUser } from '@/lib/auth';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

import Discover from '@/components/Discover';
import Channel from '@/components/Channel';
import Unauthorized from '@/components/Unauthorized';

export const AppRoutes = () => {
  const { data: user } = useUser();

  const commonRoutes: RouteObject[] = [
    { path: '/channels', element: <Discover /> },
    { path: '/channels/:channelName', element: <Channel /> },
    { path: '/unauthorized', element: <Unauthorized /> },
  ];

  const routes = user ? protectedRoutes : publicRoutes;
  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
