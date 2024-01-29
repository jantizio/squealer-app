import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { isErrorMessages } from '@/utils/type-guards';
import { isValidationErrorLike } from 'zod-validation-error';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 20 * 1000, // 20 seconds
    },
  },
  queryCache: new QueryCache({
    onError(error, query) {
      // show toast only on backgound refetch
      if (query.state.data !== undefined) {
        if (isValidationErrorLike(error)) {
          toast.error(error.message);
        }
      }
    },
  }),
  mutationCache: new MutationCache({
    onError(error, _variables, _context, mutation) {
      const errorMessages = mutation.meta?.errorMessages;
      if (
        isErrorMessages(errorMessages) &&
        error instanceof AxiosError &&
        error.response?.status
      ) {
        const statusCode = error.response.status;
        const errorMessage = errorMessages[statusCode] ?? errorMessages.generic;
        toast.error(errorMessage);
      } else {
        console.log('not axios error');
        toast.error('Qualcosa è andato storto, riprova più tardi');
      }
    },
  }),
});
