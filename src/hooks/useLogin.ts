import { useSignIn } from 'react-auth-kit';
import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

type creds_t = {
  username: string;
  password: string;
};

// type response_t = {
//   token: string;
//   expiresIn: number;
// };

export default function useLogin() {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const login = useMutation<string, AxiosError, creds_t>({
    mutationKey: ['login'],
    mutationFn: async (credentials) => {
      const loginApi: string = `${import.meta.env.VITE_API_URL}/token`;

      const { data } = await axios.post<string>(loginApi, credentials);
      return data;
    },
    onSuccess(data, variables) {
      // questo viene chiamato per gli status code 2xx
      console.log('SUCCESS!');
      console.log('data:', data);

      // eseguo il login dell'utente
      signIn({
        token: data,
        expiresIn: 3600,
        tokenType: 'Bearer',
        authState: { username: variables.username },
      });
      navigate('/');
    },
    onError(error) {
      if (error.response?.status === 401) {
        console.log('credenziali errate');
      }
    },
  });

  return login.mutate;
}
