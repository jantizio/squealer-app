import { createComment } from '@/api/comments';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { isValidationErrorLike } from 'zod-validation-error';

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [{ scope: 'squeals' }] });
    },
    onError(error) {
      if (isValidationErrorLike(error)) {
        return toast.error(error.message);
      }
    },
    meta: {
      errorMessages: {
        generic: 'Qualcosa è andato storto, riprova più tardi',
      },
    },
  });
};
