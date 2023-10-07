import { axios } from '@/lib/axios';
import { channel_t, squealRead_t } from '@/utils/types';

export const getChannels = async (
  type?: 'public' | 'private',
  official?: boolean,
): Promise<channel_t[]> => {
  const typeQuery = type ? `type=${type}` : '';
  const officialQuery = official === undefined ? `official=${official}` : '';

  const response = await axios.get<channel_t[]>(
    `/channels/?${typeQuery}&${officialQuery}`,
  );
  return response.data;
};

export const createChannel = async (channel: channel_t): Promise<channel_t> => {
  const response = await axios.post<channel_t>('/channels', channel);
  return response.data;
};

export const getChannel = async (channelName: string): Promise<channel_t> => {
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
