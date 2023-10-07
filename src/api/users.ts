import { axios } from '@/lib/axios';
import { userRead_t, userWrite_t, login_t } from '@/utils/types';

export const getUser = async (
  username?: login_t['username'],
): Promise<userRead_t> => {
  let response;
  if (username) {
    response = await axios.get<userRead_t>(`/users/${username}`);
    return response.data;
  }
  response = await axios.get<userRead_t>('/users/me');
  return response.data;
};

export const createUser = async (data: userWrite_t): Promise<userRead_t> => {
  const response = await axios.put<userRead_t>(`/users/${data.username}`, data);
  return response.data;
};

export const deleteUser = async (username: string): Promise<void> => {
  await axios.delete<userRead_t>(`/users/${username}`);
};

export const getUsers = async (): Promise<userRead_t[]> => {
  const response = await axios.get<userRead_t[]>(`/users`);
  return response.data;
};

export const getUserByUsername = async (
  username: string,
): Promise<userRead_t> => {
  const response = await axios.get<userRead_t>(`/users/${username}`);
  return response.data;
};
