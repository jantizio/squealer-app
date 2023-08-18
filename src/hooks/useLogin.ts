import { useSignIn } from 'react-auth-kit';
import { useToast } from '@/hooks/useToast';
import { AxiosError } from 'axios';
import { backendApi } from '@/lib/utils';
import { error_t } from '@/lib/types';
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
  const { toast } = useToast();
  const login = useMutation<string, AxiosError, creds_t>({
    mutationKey: ['login'],
    mutationFn: async (credentials) => {
      const { data } = await backendApi.post<string>('/token', credentials);
      return data;
    },
    onSuccess(data, variables) {
      // questo viene chiamato per gli status code 2xx
      console.log('Login SUCCESS!');
      console.log('data:', data);

      const token_payload = jwt_decode<token_payload_t>(data); //TODO: forse try catch per token non valido

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
      // TODO: potrebbe essere necessario fare il redirect alla pagina da cui l'utente è arrivato
    },
    onError(error) {
      const errorLog: error_t = {
        path: error.config?.url ?? '/token',
        method: 'POST',
        message: error.message,
      };

      console.log(errorLog);
      if (error.response?.status === 401) {
        console.log('credenziali errate');
        toast({
          variant: 'destructive',
          title: 'Uh oh! Qualcosa è andato storto.',
          description: 'Credenziali errate',
        });
      } else {
        console.log('altro errore');
        toast({
          variant: 'destructive',
          title: 'Uh oh! Qualcosa è andato storto.',
          description: "C'è stato un problema, riprova",
        });

        backendApi.put('/logs', errorLog);
      }
    },
  });

  return login.mutate;
}
