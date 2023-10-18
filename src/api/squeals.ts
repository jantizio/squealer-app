import { axios } from '@/lib/axios';
import { squealReadSchema } from '@/schema/shared-schema/squealValidators';
import { run } from '@/utils';
import type {
  SquealsQueryContext,
  squealOperation_t,
  squealRead_t,
  squealWrite_t,
} from '@/utils/types';
import { validate } from '@/utils/validators';
import { z } from 'zod';

export const getSqueals = async ({
  queryKey: [{ filter, channelName, author }],
  pageParam: page = 0,
}: SquealsQueryContext['filter']): Promise<squealRead_t[]> => {
  const authorQuery = author ? `&author=${encodeURIComponent(author)}` : '';
  const channelQuery = channelName
    ? `&channel=${encodeURIComponent(channelName)}`
    : '';
  const filterQuery = run(() => {
    if (!filter) return '';
    if (filter.startsWith('@')) return `&author=${encodeURIComponent(filter)}`;
    else return `&query=${encodeURIComponent(filter)}`;
  });

  const response = await axios.get<unknown[]>(
    `/squeals/?page=${page}${authorQuery}${channelQuery}${filterQuery}`,
  );
  return validate(response.data, z.array(squealReadSchema));
};

export const getChannelSqueals = async (
  page: number,
  channelName: string,
  author?: string,
): Promise<squealRead_t[]> => {
  const authorQuery = author ? `&author=${encodeURIComponent(author)}` : '';

  const response = await axios.get<unknown[]>(
    `/channels/${encodeURIComponent(
      channelName,
    )}/squeals?&page=${page}${authorQuery}`,
  );
  return validate(response.data, z.array(squealReadSchema));
};

export const createSqueal = async (
  squeal: squealWrite_t,
): Promise<squealRead_t> => {
  const response = await axios.post<unknown>('/squeals/', squeal);
  return validate(response.data, squealReadSchema);
};

export const getSqueal = async ({
  queryKey: [{ id }],
}: SquealsQueryContext['specific']): Promise<squealRead_t> => {
  const response = await axios.get<unknown>(`/squeals/${id}`);
  return validate(response.data, squealReadSchema);
};

export const deleteSqueal = async (id: string): Promise<void> => {
  await axios.delete(`/squeals/${id}`);
};

export const updateSqueal = async ({
  id,
  operation,
}: {
  id: string;
  operation: squealOperation_t;
}): Promise<squealRead_t> => {
  const response = await axios.patch<squealRead_t>(`/squeals/${id}`, {
    op: operation,
  });
  return response.data;
};
