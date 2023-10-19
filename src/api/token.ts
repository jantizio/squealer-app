import { axios } from '@/lib/axios';
import type { login_t } from '@/utils/types';

export const refreshAccessToken = async (): Promise<string> => {
  const response = await axios.post<string>('/token/refresh');
  return response.data;
};

export const login = async (data: login_t): Promise<string> => {
  const response = await axios.post<string>('/token', data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await axios.delete('/token');
};
