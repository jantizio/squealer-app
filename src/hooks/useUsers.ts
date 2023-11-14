import { changeUserPassword, changeUserSMM, deleteUser } from '@/api/users';
import { useLogout } from '@/lib/auth';
import type { userRead_t } from '@/utils/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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

export const useChangeSMMMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: changeUserSMM,
    onSuccess: (_, variables) => {
      toast.success('Social Media Manager cambiato con successo');
      queryClient.setQueryData<userRead_t>(
        ['authenticated-user'],
        (oldData) => {
          if (!oldData) return oldData;
          return { ...oldData, SMM: variables.smm };
        },
      );
    },
    meta: {
      errorMessages: {
        generic: 'Qualcosa è andato storto, riprova più tardi',
      },
    },
  });
};
