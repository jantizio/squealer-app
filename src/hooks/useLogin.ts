import { addLog } from '@/api/logs';
import { useLogin as useLoginLib } from '@/lib/auth';
import type { log_t } from '@/utils/types';
import { AxiosError } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from ?? '/';

  const { mutate, ...rest } = useLoginLib({
    onSuccess() {
      toast.success('Login effettuato con successo');
      navigate(from);
    },
    onError(error) {
      if (error instanceof AxiosError) {
        const errorLog: log_t = {
          path: error.config?.url ?? '/token',
          method: 'POST',
          message: `AxiosError: ${error.message}`,
        };

        console.log(errorLog);
        addLog(errorLog);
      }
    },
    meta: {
      errorMessages: {
        401: 'Credenziali errate',
        generic: 'Qualcosa è andato storto, riprova più tardi',
      },
    },
  });

  return { loginUser: mutate, ...rest };
};
