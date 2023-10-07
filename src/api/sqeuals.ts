import { axios } from '@/lib/axios';
import { squealRead_t, squealWrite_t } from '@/utils/types';

type op = 'viewed' | 'upvote' | 'downvote';

export const getSqueals = async (
  page?: number,
  author?: string,
  channel?: string,
): Promise<squealRead_t[]> => {
  const pageQuery = page ? `page=${page}` : '';
  const authorQuery = author ? `author=${author}` : '';
  const channelQuery = channel ? `channel=${channel}` : '';

  const response = await axios.get<squealRead_t[]>(
    `/squeals/?${pageQuery}&${authorQuery}&${channelQuery}`,
  );
  return response.data;
};

export const createSqueal = async (
  squeal: squealWrite_t,
): Promise<squealRead_t> => {
  const response = await axios.post<squealRead_t>('/squeals', squeal);
  return response.data;
};

export const getSqueal = async (id: number): Promise<squealRead_t> => {
  const response = await axios.get<squealRead_t>(`/squeals/${id}`);
  return response.data;
};

export const deleteSqueal = async (id: number): Promise<void> => {
  await axios.delete(`/squeals/${id}`);
};

export const updateSqueal = async (
  id: number,
  operation: op,
): Promise<squealRead_t> => {
  const response = await axios.patch<squealRead_t>(`/squeals/${id}`, {
    op: operation,
  });
  return response.data;
};
