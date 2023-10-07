import { useToast } from '@/hooks/useToast';
import { AxiosError } from 'axios';
import { getUser, privateApi } from '@/lib/axios';
import { log_t, login_t, token_payload_t, userRead_t } from '@/utils/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import jwt_decode, { InvalidTokenError } from 'jwt-decode';
import useAuth from '@/hooks/auth/useAuth';

type loginResponse_t = {
  token: string;
  // user: userRead_t;
};

export default function useLogin() {
  const { state, dispatch } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? '/';
  // console.log('from:', from, '\n', 'location:', location);

  const authUserQuery = useQuery(['authUser'], getUser, {
    enabled: false,
    retry: 1,
    onSuccess: (data) => {
      console.log('authUserQuery SUCCESS!');
      console.log('data:', data);
      dispatch({ type: 'SET_USER', payload: data });
    },
  });

  const navigate = useNavigate();
  const { toast } = useToast();
  const login = useMutation<
    loginResponse_t,
    AxiosError | InvalidTokenError,
    login_t
  >({
    mutationFn: async (credentials) => {
      const { data: token } = await privateApi.post<string>(
        '/token',
        credentials,
      );
      return { token };
    },
    onSuccess(data) {
      // questo viene chiamato per gli status code 2xx
      console.log('Login SUCCESS!');
      console.log('data:', data);

      // const token_payload = jwt_decode<token_payload_t>(data.token);

      // // calculate expiration time in minutes
      // const expiresIn = Math.floor(
      //   (token_payload.exp - token_payload.iat) / 60,
      // );

      // eseguo il login dell'utente
      // setAuth({
      //   token: data.token,
      //   expiresIn: expiresIn,
      //   tokenType: 'Bearer',
      //   authState: data.user,
      // });
      authUserQuery.refetch();
      toast({
        title: 'Successo!',
        description: 'Login effettuato con successo!',
      });
      // TODO: potrebbe essere necessario fare il redirect alla pagina da cui l'utente è arrivato
      navigate(from, { replace: true });
    },
    onError(error) {
      let errorLog: log_t;
      if (error instanceof AxiosError) {
        errorLog = {
          path: error.config?.url ?? '/token',
          method: 'POST',
          message: `AxiosError: ${error.message}`,
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
        }
      } else {
        errorLog = {
          path: '/token',
          method: 'POST',
          message: `InvalidTokenError: ${error.message}`,
        };
        console.log('token non valido');
        toast({
          variant: 'destructive',
          title: 'Uh oh! Qualcosa è andato storto.',
          description: 'Token non valido',
        });
      }

      privateApi.put('/logs', errorLog);
    },
  });

  return login.mutate;
}
