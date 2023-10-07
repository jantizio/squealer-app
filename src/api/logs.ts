import { axios } from '@/lib/axios';
import { log_t } from '@/utils/types';

export const postLog = async (log: log_t): Promise<void> => {
  await axios.put('/logs', log);
};

export const getLogs = async (): Promise<log_t[]> => {
  const response = await axios.get<log_t[]>('/logs');
  return response.data;
};
