import { axios } from '@/lib/axios';
import { run } from '@/utils';
import { channel_t, squealRead_t } from '@/utils/types';
import { ChannelsQueryContext } from '@/utils/types';

export const getChannels = async ({
  queryKey: [{ filter }],
}: ChannelsQueryContext['filter']): Promise<channel_t[]> => {
  const query = run(() => {
    if (filter === 'official') return '?official=true';
    else if (filter === 'subscribed')
      return '?type=public&official=false'; // TODO: use the right query
    else if (filter === 'direct')
      return '?type=private'; // TODO: use the right query
    else return '';
  });

  const response = await axios.get<channel_t[]>(`/channels/${query}`);
  return response.data;
};

export const createChannel = async (channel: channel_t): Promise<channel_t> => {
  const response = await axios.post<channel_t>('/channels', channel);
  return response.data;
};

export const getChannel = async ({
  queryKey: [{ channelName }],
}: ChannelsQueryContext['specific']): Promise<channel_t> => {
  const response = await axios.get<channel_t>(`/channels/${channelName}`);
  return response.data;
};

export const getChannelSqueals = async (
  channelName: string,
  page: number,
  author?: string,
): Promise<squealRead_t[]> => {
  const pageQuery = page ? `page=${page}` : '';
  const authorQuery = author ? `author=${author}` : '';

  const response = await axios.get<squealRead_t[]>(
    `/channels/${channelName}/squeals?${pageQuery}&${authorQuery}`,
  );
  return response.data;
};
