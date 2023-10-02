import { useCookies } from 'react-cookie';
import { useQuery } from '@tanstack/react-query';
import { getMeFn } from '@/lib/axios';
import useAuth from '@/hooks/auth/useAuth';

import React from 'react';

type AuthSetterProps = {
  children: React.ReactElement;
};

const AuthSetter = ({ children }: AuthSetterProps) => {
  const [cookies] = useCookies(['logged_in']);
  const { dispatch } = useAuth();

  console.log('cookie?:', cookies);

  const query = useQuery(['authUser'], () => getMeFn(), {
    enabled: !!cookies.logged_in,
    onSuccess: (data) => {
      console.log("success: got user")
      dispatch({ type: 'SET_USER', payload: data });
    },
    onError: (err) => {
      console.log(err);
      console.log("error: couldn't get user");
      
      dispatch({ type: 'SET_USER', payload: null });
    }
  });

  if (query.isLoading && cookies.logged_in) {
    return <p>Loading...</p>;
  }

  return children;
};

export default AuthSetter;
