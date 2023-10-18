import { axios } from '@/lib/axios';
import { validate } from '@/utils/validators';
import { z } from 'zod';

export const addMedia = async (file: File): Promise<string> => {
  const response = await axios.postForm<unknown>('/media', { media: file });
  return validate(response.data, z.string().url());
};
