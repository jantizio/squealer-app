import { axios } from '@/lib/axios';
import type { userRead_t, userWrite_t, login_t } from '@/utils/types';

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

export const changeUserPassword = async ({
  username,
  oldPassword,
  password,
}: {
  username: string;
  oldPassword: string;
  password: string;
}): Promise<void> => {
  await axios.patch(`/users/${username}/password`, {
    oldPassword,
    newPassword: password,
  });
};

export const changeUserSMM = async ({
  username,
  SMM,
}: {
  username: string;
  SMM: `@${string}`;
}): Promise<void> => {
  await axios.patch(`/users/${username}/smm`, { SMM });
};

export const removeUserSMM = async ({
  username,
}: {
  username: string;
}): Promise<void> => {
  await axios.delete(`/users/${username}/smm`);
};

export const askForResetPassword = async ({
  usernameOrEmail,
}: {
  usernameOrEmail: string;
}): Promise<{ message: string; link: string; token: string }> => {
  const response = await axios.post(`/users/${usernameOrEmail}/password_reset`);
  return response.data;
};

export const resetPassword = async ({
  usernameOrEmail,
  password,
  token,
}: {
  usernameOrEmail: string;
  password: string;
  token: string;
}): Promise<void> => {
  await axios.post(`/users/${usernameOrEmail}/password_reset`, {
    password,
    token,
  });
};
