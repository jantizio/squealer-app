import useLogin from '@/hooks/useLogin';
import { user_t } from '@/globals/types';
import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function useRegister() {
  const loginUser = useLogin();
  const navigate = useNavigate();
  const register = useMutation<user_t, AxiosError, user_t>({
    mutationKey: ['register'],
    mutationFn: async (newUser) => {
      const registerApi: string = `${import.meta.env.VITE_API_URL}/users/${
        newUser.username
      }`;

      const { data } = await axios.put(registerApi, newUser);
      return data;
    },
    onSuccess(data) {
      // questo viene chiamato per gli status code 2xx
      console.log('SUCCESS!');
      console.log('data:', data);
      // eseguo il login dell'utente
      const creds = {
        username: data.username,
        password: data.password,
      };

      loginUser(creds);
      // TODO: potrebbe essere necessario fare il redirect alla pagina da cui l'utente è arrivato
      navigate('/');
    },
    onError(error) {
      // questo viene chiamato per gli status code che non sono 2xx
      // console.log('error:', error);

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
