import axios from 'axios';
import { login_t, userRead_t, userWrite_t } from '../utils/types';
import { errorPayloadCheck } from './utils';
// const BASE_URL = 'http://localhost:8000/api';
const BASE_URL = 'https://site222315.tw.cs.unibo.it/api';

// export const backendApi = axios.create({
//   baseURL: BASE_URL,
// });

export const privateApi = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const refreshAccessToken = async (): Promise<string> => {
  const response = await privateApi.post<string>('/token/refresh');
  return response.data;
};

privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config;
    // TODO: definire bene il tipo di payload e il messaggio di errore
    const errorMessage = error.response?.data;
    const isTokenExpired =
      errorPayloadCheck(errorMessage) &&
      errorMessage.message.includes('Invalid token');

    if (
      error.response?.status === 401 &&
      isTokenExpired &&
      !prevRequest?.sent
    ) {
      prevRequest.sent = true;
      await refreshAccessToken();
      return privateApi(prevRequest);
    }

    //TODO: redirect to login page
    // if (error.response.data.message.includes('Expired refresh token')) {
    //   document.location.href = '/login';
    // }
    return Promise.reject(error);
  },
);

export const getUser = async (): Promise<userRead_t> => {
  const response = await privateApi.get<userRead_t>('/users/me');
  return response.data;
};

export const login = async (data: login_t): Promise<string> => {
  const response = await privateApi.post<string>('/token', data);
  return response.data;
};

export const register = async (data: userWrite_t): Promise<userRead_t> => {
  const response = await privateApi.put<userRead_t>(
    `/users/${data.username}`,
    data,
  );
  return response.data;
};

export const logout = async () => {
  await privateApi.delete('/token');
  // window.location.assign(window.location.origin);
};
