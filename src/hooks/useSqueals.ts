import {
  createSqueal,
  getNotifications,
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
  type InfiniteData,
} from '@tanstack/react-query';
import { toast } from 'sonner';
import { isValidationErrorLike } from 'zod-validation-error';

export const squealsKey = {
  all: [{ scope: 'squeals' }] as const,
  notifications: () =>
    [{ ...squealsKey.all[0], type: 'notifications' }] as const,
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
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length : undefined;
    },
    select: (data) => ({
      pages: data.pages.flat(),
      pageParams: data.pageParams,
    }),
  });

export const useSquealQuery = (id: string) =>
  useQuery({
    queryKey: squealsKey.specific(id),
    queryFn: getSqueal,
  });

export const useNotificationsQuery = () =>
  useQuery({
    queryKey: squealsKey.notifications(),
    queryFn: getNotifications,
  });

export const useUpdateSquealMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSqueal,
    onSuccess: (newSqueal) => {
      queryClient.setQueriesData<InfiniteData<squealRead_t[]>>(
        { queryKey: squealsKey.lists() },
        (oldData) => ({
          pageParams: oldData?.pageParams ?? [],
          pages:
            oldData?.pages.map((page) =>
              page.map((squeal) =>
                squeal.id === newSqueal.id ? newSqueal : squeal,
              ),
            ) ?? [],
        }),
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
