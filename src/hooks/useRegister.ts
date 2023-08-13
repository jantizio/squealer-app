import useLogin from '@/hooks/useLogin';
import { error_t, user_t } from '@/lib/types';
import { AxiosError } from 'axios';
import { backendApi } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useRegister() {
  const loginUser = useLogin();
  const register = useMutation<user_t, AxiosError, user_t>({
    mutationKey: ['register'],
    mutationFn: async (newUser) => {
      const { data } = await backendApi.put<user_t>(
        `/users/${newUser.username}`,
        newUser
      );
      return data;
    },
    onSuccess(data, variables) {
      // questo viene chiamato per gli status code 2xx
      console.log('Registration SUCCESS!');
      console.log('data:', data);
      // eseguo il login dell'utente
      const creds = {
        username: data.username,
        password: variables.password,
      };

      loginUser(creds);
    },
    onError(error) {
      // questo viene chiamato per gli status code che non sono 2xx
      // console.log('error:', error);
      const errorLog: error_t = {
        path: error.config?.url ?? '/users/${username}',
        method: 'PUT',
        message: error.message,
      };

      backendApi.put('/logs', errorLog);

      if (error.response?.status === 409) {
        console.log('utente già registrato');
        return toast.error('Utente già registrato');
      } else if (
        error.response?.status === 400 ||
        error.response?.status === 422
      ) {
        console.log('errore di validazione');
        return toast.error('Errore di validazione dei dati');
      } else {
        console.log('errore sconosciuto');

        return toast.error('Qualcosa è andato storto, riprova più tardi');
      }
    },
  });

  return register.mutate;
}
