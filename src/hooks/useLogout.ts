import { useLogout as useLogoutLib } from '@/lib/auth';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useLogoutLib({
    onSuccess() {
      toast.success('Logout effettuato con successo');
      queryClient.clear();
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
