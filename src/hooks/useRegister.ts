import { addLog } from '@/api/logs';
import { useLogin, useRegister as useRegisterLib } from '@/lib/auth';
import type { log_t } from '@/utils/types';
import { AxiosError } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useRegister = () => {
  const { mutate: login } = useLogin();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from ?? '/';

  const { mutate, ...rest } = useRegisterLib({
    onSuccess(_data, variables) {
      toast.success('Registrazione effettuata con successo');
      login({ username: variables.username, password: variables.password });
      navigate(from);
    },
    onError(error, { username }) {
      if (error instanceof AxiosError) {
        const errorLog: log_t = {
          path: error.config?.url ?? `/users/${username}`,
          method: 'PUT',
          message: error.message,
        };

        addLog(errorLog);
      }
    },
    meta: {
      errorMessages: {
        409: 'Username già in uso',
        400: 'Errore di validazione dei dati',
        422: 'Errore di validazione dei dati',
        generic: 'Qualcosa è andato storto, riprova più tardi',
      },
    },
  });

  return { registerUser: mutate, ...rest };
};
