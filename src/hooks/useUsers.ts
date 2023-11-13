import { changeUserPassword, deleteUser } from '@/api/users';
import { useLogout } from '@/lib/auth';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useDeleteUserMutation = () => {
  const { mutate: logoutUser } = useLogout();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      logoutUser({});
      toast.success('Utente eliminato con successo');
      navigate('/');
    },
    meta: {
      errorMessages: {
        generic: 'Qualcosa è andato storto, riprova più tardi',
      },
    },
  });
};

export const useChangePasswordMutation = () =>
  useMutation({
    mutationFn: changeUserPassword,
    onSuccess: () => {
      toast.success('Password cambiata con successo');
    },
    meta: {
      errorMessages: {
        generic: 'Qualcosa è andato storto, riprova più tardi',
      },
    },
  });
