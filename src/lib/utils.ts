// Tailwind CSS utility
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Axios utility
import axios from 'axios';

export const backendApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  // headers: { Authorization: authHeader() },
});

// Type guards
export function errorCheck(error: unknown): error is Error {
  return error instanceof Error;
}

import { AuthStateUserObject } from 'react-auth-kit/dist/types';
import { authUser_t } from '@/lib/types';
export function userCheck(
  user: AuthStateUserObject | null
): user is authUser_t {
  return user !== null;
}

// global variables

export const passwRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-.]).{8,}$/;
