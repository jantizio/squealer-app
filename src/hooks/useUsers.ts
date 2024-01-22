import {
  askForResetPassword,
  buyUserQuota,
  changeUserPassword,
  changeUserSMM,
  deleteUser,
  removeUserSMM,
  resetPassword,
} from '@/api/users';
import { useLogin, useLogout } from '@/lib/auth';
import type { userRead_t } from '@/utils/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
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
          return { ...oldData, SMM: variables.SMM };
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

export const useRemoveSMMMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeUserSMM,
    onSuccess: () => {
      toast.success('Social Media Manager rimosso con successo');
      queryClient.setQueryData<userRead_t>(
        ['authenticated-user'],
        (oldData) => {
          if (!oldData) return oldData;
          return { ...oldData, SMM: null };
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

export const useAskForPasswordResetMutation = () =>
  useMutation({
    mutationFn: askForResetPassword,
    meta: {
      errorMessages: {
        400: 'Email o username non inseriti',
        404: 'Utente non trovato',
        generic: 'Qualcosa è andato storto, riprova più tardi',
      },
    },
  });

export const useResetPasswordMutation = () => {
  const { mutate: login } = useLogin();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from ?? '/';

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (_, variables) => {
      toast.success('Password cambiata con successo');
      // there is implicit knowledge here that usernameOrEmail is a username
      login({
        username: variables.usernameOrEmail as `@${string}`,
        password: variables.password,
      });
      navigate(from);
    },
    meta: {
      errorMessages: {
        400: 'Autorizzazione fallita, riprova più tardi',
        generic: 'Qualcosa è andato storto, riprova più tardi',
      },
    },
  });
};

export const buyQuotaMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: buyUserQuota,
    onSuccess: (newUser) => {
      queryClient.setQueryData(['authenticated-user'], newUser);
      toast.success('Quota acquistata con successo');
    },
    meta: {
      errorMessages: {
        generic: 'Qualcosa è andato storto, riprova più tardi',
      },
    },
  });
}