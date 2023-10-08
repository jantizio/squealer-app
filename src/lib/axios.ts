import { refreshAccessToken } from '@/api/auth';
import { BASE_URL } from '@/config';
import Axios from 'axios';
import { errorPayloadCheck } from '@/utils/type-guards';

// export const backendApi = axios.create({
//   baseURL: BASE_URL,
// });

export const axios = Axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axios.interceptors.response.use(
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
      return axios(prevRequest);
    }

    //TODO: redirect to login page
    // if (error.response.data.message.includes('Expired refresh token')) {
    //   document.location.href = '/login';
    // }
    return Promise.reject(error);
  },
);
