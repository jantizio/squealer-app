import { getChannel, getChannels } from '@/api/channels';
import type { channel_t, filter_t } from '@/utils/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const channelsKey = {
  all: [{ scope: 'channels' }] as const,
  lists: () => [{ ...channelsKey.all[0], type: 'lists' }] as const,
  filter: (filter: filter_t = '') =>
    [{ ...channelsKey.lists()[0], filter }] as const,
  elements: () => [{ ...channelsKey.all[0], type: 'element' }] as const,
  specific: (channelName: string) =>
    [{ ...channelsKey.elements()[0], channelName }] as const,
};

export const useChannelsQuery = (filter?: filter_t) =>
  useQuery({
    queryKey: channelsKey.filter(filter),
    queryFn: getChannels,
  });

export const useChannelQuery = (channelName: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: channelsKey.specific(channelName),
    queryFn: getChannel,
    placeholderData: () => {
      // seeding data to the cache has the problem that the data might be undefined in success state
      // so we need to use placeholderData, but it's not so useful
      const trovato = queryClient
        .getQueriesData<channel_t[]>(channelsKey.lists())
        .map(
          ([, channels]) =>
            channels?.find((channel) => channel.name === channelName),
        )
        .find((channel) => channel !== undefined);
      return trovato;
    },
  });
};
