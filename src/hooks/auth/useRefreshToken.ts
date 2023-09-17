import { token_payload_t, userRead_t } from '@/lib/types';
import { privateApi } from '@/lib/utils';
import jwt_decode from 'jwt-decode';
import useAuth from './useAuth';

export default function useRefreshToken() {
  const { setAuth } = useAuth();

  return async () => {
    const { data: newToken } = await privateApi.post<string>('/token/refresh');

    // TODO: try catch for jwt_decode
    const token_payload = jwt_decode<token_payload_t>(newToken);
    console.log('token_payload:', token_payload);

    // calculate expiration time in minutes
    const expiresIn = Math.floor((token_payload.exp - token_payload.iat) / 60);

    const { data: user } = await privateApi.get<userRead_t>(
      `/users/${token_payload.username}`,
    );

    setAuth((prev) => {
      if (prev === null)
        return {
          token: newToken,
          expiresIn: expiresIn,
          tokenType: 'Bearer',
          authState: user,
        };
      return {
        ...prev,
        token: newToken,
      };
    });

    return newToken;
  };
}
