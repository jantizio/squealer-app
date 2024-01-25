import type { CookieAttributes } from 'node_modules/@types/js-cookie';

// export const BASE_URL = 'https://site222315.tw.cs.unibo.it/api';
export const BASE_URL = 'http://localhost:8000/api';
export const nonTextQuota = 125;
export const tempSquealCookieKey = 'temporizedSqueals';
export const cookieOptions: CookieAttributes = {
  expires: new Date(2147483647 * 1000), // arbitrarily large expiration date
  sameSite: 'Lax',
};
