import { axios } from '@/lib/axios';

export const addMedia = async (form: FormData): Promise<string> => {
  const response = await axios.post<string>('/media', form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
