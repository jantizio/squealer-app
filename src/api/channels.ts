import { axios } from '@/lib/axios';
import { channelSchema } from '@/schema/shared-schema/channelValidator';
import { run } from '@/utils';
import type { ChannelsQueryContext, channel_t } from '@/utils/types';
import { validate } from '@/utils/validators';
import { z } from 'zod';

export const getChannels = async ({
  queryKey: [{ filter }],
}: ChannelsQueryContext['filter']): Promise<channel_t[]> => {
  const query = run(() => {
    if (filter === 'official') return '?official=true';
    else if (filter === 'subscribed') return '?subscribed=true';
    else if (filter === 'direct') return '?type=direct';
    else return '';
  });

  const response = await axios.get<unknown[]>(`/channels/${query}`);
  return validate(response.data, z.array(channelSchema));
};

export const createChannel = async (channel: channel_t): Promise<channel_t> => {
  const response = await axios.post<unknown>('/channels', channel);
  return validate(response.data, channelSchema);
};

export const getChannel = async ({
  queryKey: [{ channelName }],
}: ChannelsQueryContext['specific']): Promise<channel_t> => {
  const response = await axios.get<unknown>(
    `/channels/${encodeURIComponent(channelName)}`,
  );
  return validate(response.data, channelSchema);
};

export const subscribeChannel = async ({
  channelName,
  op,
}: {
  channelName: string;
  op: 'subscribe' | 'unsubscribe';
}): Promise<void> => {
  if (op === 'subscribe')
    await axios.patch(`/channels/${encodeURIComponent(channelName)}/subscribe`);
  else
    await axios.delete(
      `/channels/${encodeURIComponent(channelName)}/subscribe`,
    );
};
