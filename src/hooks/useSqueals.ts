import { getSqueal, getSqueals } from '@/api/squeals';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const squealsKey = {
  all: [{ scope: 'squeals' }] as const,
  lists: () => [{ ...squealsKey.all[0], type: 'lists' }] as const,
  filter: (filter?: string, channelName?: string, author?: string) =>
    [{ ...squealsKey.lists()[0], channelName, author, filter }] as const,
  elements: () => [{ ...squealsKey.all[0], type: 'element' }] as const,
  specific: (id: number) => [{ ...squealsKey.elements()[0], id }] as const,
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
  });

export const useSquealQuery = (id: number) =>
  useQuery({
    queryKey: squealsKey.specific(id),
    queryFn: getSqueal,
  });
