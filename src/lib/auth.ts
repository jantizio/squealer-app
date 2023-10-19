import { configureAuth } from './react-query-auth';
import { login, logout } from '@/api/token';
import { createUser, getUser } from '@/api/users';
import Cookies from 'js-cookie';
import type { login_t, userWrite_t } from '@/utils/types';

async function userFn() {
  if (Cookies.get('logged_in') === 'true') {
    return await getUser();
  }
  return null;
}

async function loginFn(data: login_t) {
  await login(data);
  return await getUser();
}

async function registerFn(data: userWrite_t) {
  return await createUser(data);
}

async function logoutFn() {
  await logout();
}

export const { useUser, useLogin, useRegister, useLogout, AuthLoader } =
  configureAuth({
    userFn,
    loginFn,
    registerFn,
    logoutFn,
  });
