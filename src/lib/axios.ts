import axios, { AxiosError } from 'axios';
import { userRead_t } from './types';
const BASE_URL = 'http://localhost:8000/api';
// const BASE_URL = 'https://site222315.tw.cs.unibo.it/api';

// export const backendApi = axios.create({
//   baseURL: BASE_URL,
// });

export const privateApi = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const refreshAccessTokenFn = async () => {
  const response = await privateApi.post<string>('/token/refresh');
  return response.data;
};

privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config;
    // TODO: definire bene il tipo di payload e il messaggio di errore
    const payload = error.response?.data as { error: string };
    console.log('sent', prevRequest?.sent);
    // console.log('retry', prevRequest?._retry);
    if (
      error.response?.status === 401 &&
      payload.error.includes('Invalid token') &&
      !prevRequest?.sent
    ) {
      prevRequest.sent = true;
      await refreshAccessTokenFn();
      return privateApi(prevRequest);
    }

    //TODO: redirect to login page
    // if (error.response.data.message.includes('not refresh')) {
    //   document.location.href = '/login';
    // }
    return Promise.reject(error);
  },
);

export const getMeFn = async () => {
  const response = await privateApi.get<userRead_t>('users/me');
  return response.data;
};
