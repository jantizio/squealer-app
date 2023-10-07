import useLogin from '@/hooks/useLogin';
import { log_t, userWrite_t, userRead_t, login_t } from '@/utils/types';
import { AxiosError } from 'axios';
import { privateApi } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/useToast';

export default function useRegister() {
  const loginUser = useLogin();
  const { toast } = useToast();
  const register = useMutation<userRead_t, AxiosError, userWrite_t>({
    mutationFn: async (newUser) => {
      const { data } = await privateApi.put(
        `/users/${newUser.username}`,
        newUser,
      );
      // don't need to validate data because im not using it
      return data;
    },
    onSuccess(data, variables) {
      // questo viene chiamato per gli status code 2xx
      console.log('Registration SUCCESS!');
      console.log('data:', data);
      toast({
        title: 'Successo!',
        description: 'Registrazione effettuato con successo!',
      });
      // eseguo il login dell'utente
      const creds: login_t = {
        username: variables.username,
        password: variables.password,
      };

      loginUser(creds);
    },
    onError(error, { username }) {
      // questo viene chiamato per gli status code che non sono 2xx
      // console.log('error:', error);
      const errorLog: log_t = {
        path: error.config?.url ?? `/users/${username}`,
        method: 'PUT',
        message: error.message,
      };

      privateApi.put('/logs', errorLog);

      if (error.response?.status === 409) {
        console.log('utente già registrato');
        toast({
          variant: 'destructive',
          title: 'Uh oh! Qualcosa è andato storto.',
          description: 'Utente già registrato',
        });
      } else if (
        error.response?.status === 400 ||
        error.response?.status === 422
      ) {
        console.log('errore di validazione');
        toast({
          variant: 'destructive',
          title: 'Uh oh! Qualcosa è andato storto.',
          description: 'Errore di validazione dei dati',
        });
      } else {
        console.log('errore sconosciuto');
        toast({
          variant: 'destructive',
          title: 'Uh oh! Qualcosa è andato storto.',
          description: 'Qualcosa è andato storto, riprova più tardi',
        });
      }
    },
  });

  return register.mutate;
}
