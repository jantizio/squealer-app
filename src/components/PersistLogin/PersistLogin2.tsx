// import { Outlet } from 'react-router-dom';
// import { useState, useEffect, useRef } from 'react';
// import useRefreshToken from '@/hooks/auth/useRefreshToken';
// import useAuth from '@/hooks/auth/useAuth';
// import { AxiosError } from 'axios';
// import { useMutation, useQuery } from '@tanstack/react-query';
// import { run } from '@/lib/utils';

// const PersistLogin = () => {
//   const refresh = useRefreshToken();
//   const { auth, persist } = useAuth();
//   // const effectRan = useRef(false);
//   const { isLoading, isSuccess, isError, status } = useQuery({
//     queryKey: ['persistLogin'],
//     queryFn: async () => {
//       console.log('verifying refresh token');
//       if (persist && !auth?.token) await refresh();
//     },
//     retry: 1,
//   });

//   // useEffect(() => {
//   //   if (!effectRan.current) {
//   //     if (persist && !auth?.token) mutate();
//   //     return () => {
//   //       effectRan.current = true;
//   //     };
//   //   }
//   // }, []);

//   console.log('status: ', status);

//   return (
//     <>
//       {run(() => {
//         if (isSuccess) return <Outlet />;
//         if (isError) return <p>Error</p>;
//         if (isLoading) return <p>Loading...</p>;
//         return <p>Something went wrong</p>;
//       })}
//     </>
//   );
// };

// export default PersistLogin;
