import { useLogout as useLogoutLib } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useLogout = () => {
  const navigate = useNavigate();

  const { mutate, ...rest } = useLogoutLib({
    onSuccess() {
      toast.success('Logout effettuato con successo');
      navigate('/');
    },
    meta: {
      errorMessages: {
        generic: 'Qualcosa è andato storto, riprova più tardi',
      },
    },
  });
  return { logoutUser: mutate, ...rest };
};
