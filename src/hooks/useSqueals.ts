import {
  createSqueal,
  getSqueal,
  getSqueals,
  updateSqueal,
} from '@/api/squeals';
import type { squealRead_t } from '@/utils/types';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';
import { isValidationErrorLike } from 'zod-validation-error';

export const squealsKey = {
  all: [{ scope: 'squeals' }] as const,
  lists: () => [{ ...squealsKey.all[0], type: 'lists' }] as const,
  filter: (
    filter: string = '',
    channelName: string = '',
    author: string = '',
  ) => [{ ...squealsKey.lists()[0], channelName, author, filter }] as const,
  elements: () => [{ ...squealsKey.all[0], type: 'element' }] as const,
  specific: (id: string) => [{ ...squealsKey.elements()[0], id }] as const,
};

export const useSquealsQuery = (
  filter?: string,
  author?: string,
  channelName?: string,
) =>
  useInfiniteQuery({
    queryKey: squealsKey.filter(filter, channelName, author),
    queryFn: getSqueals,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length : undefined;
    },
    select: (data) => {
      return {
        ...data,
        pages: data.pages.flat(),
      };
    },
  });

export const useSquealQuery = (id: string) =>
  useQuery({
    queryKey: squealsKey.specific(id),
    queryFn: getSqueal,
  });

export const useUpdateSquealMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSqueal,
    onSuccess: (newSqueal) => {
      // queryClient.invalidateQueries(squealsKey.lists()); //TODO: safe se sotto non va
      queryClient.setQueriesData<squealRead_t[]>(
        squealsKey.lists(),
        (oldData) => {
          return oldData?.map((squeal) =>
            squeal._id === newSqueal._id ? newSqueal : squeal,
          );
        },
      );
    },
  });
};

export const useCreateSquealMutation = () =>
  useMutation({
    mutationFn: createSqueal,
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
