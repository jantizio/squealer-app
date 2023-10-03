import { privateApi } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/useToast';
import useAuth from '@/hooks/auth/useAuth';

export default function useLogout() {
  const { dispatch } = useAuth();
  const { toast } = useToast();
  const { mutate: logoutUser, isLoading } = useMutation(
    async () => {
      const response = await privateApi.delete<never>('/token');
      return response.data;
    },
    {
      onSuccess: () => {
        // window.location.href = '/login';
        dispatch({ type: 'REMOVE_USER', payload: null }); // Evitare di passare il payload null
      },
      onError: (error: any) => {
        if (Array.isArray(error.response.data.error)) {
          error.data.error.forEach((el: any) =>
            toast({
              variant: 'destructive',
              title: 'Uh oh! Qualcosa è andato storto.',
              description: el.message,
            }),
          );
        } else {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Qualcosa è andato storto.',
            description: error.response.data.message,
          });
        }
      },
    },
  );
  return { logoutUser, isLoading };
}
