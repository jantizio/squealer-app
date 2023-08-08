import { useSignIn } from 'react-auth-kit';
import { AxiosError } from 'axios';
import { backendApi } from '@/globals/utility';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

type creds_t = {
  username: string;
  password: string;
};

// type response_t = {
//   token: string;
//   expiresIn: number;
// };

type token_payload_t = {
  name: string;
  exp: number;
  iat: number;
};

export default function useLogin() {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const login = useMutation<string, AxiosError, creds_t>({
    mutationKey: ['login'],
    mutationFn: async (credentials) => {
      const { data } = await backendApi.post<string>('/token', credentials);
      return data;
    },
    onSuccess(data, variables) {
      // questo viene chiamato per gli status code 2xx
      console.log('SUCCESS!');
      console.log('data:', data);

      const token_payload = jwt_decode<token_payload_t>(data);

      // calculate expiration time in minutes
      const expiresIn = Math.floor(
        (token_payload.exp - token_payload.iat) / 60
      );

      // eseguo il login dell'utente
      signIn({
        token: data,
        expiresIn: expiresIn,
        tokenType: 'Bearer',
        authState: { username: variables.username },
      });
      navigate('/');
    },
    onError(error) {
      if (error.response?.status === 401) {
        console.log('credenziali errate');
      } else {
        console.log('altro errore');
      }
    },
  });

  return login.mutate;
}
