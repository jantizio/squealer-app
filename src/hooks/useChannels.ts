import { getChannel, getChannels } from '@/api/channels';
import { filter_t } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';

export const channelsKey = {
  all: [{ scope: 'channels' }] as const,
  lists: () => [{ ...channelsKey.all[0], type: 'lists' }] as const,
  filter: (filter?: filter_t) =>
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

export const useChannelQuery = (channelName: string) =>
  useQuery({
    queryKey: channelsKey.specific(channelName),
    queryFn: getChannel,
  });
