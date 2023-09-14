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
});

export const privateApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Type guards
export function errorCheck(error: unknown): error is Error {
  return error instanceof Error;
}

export const run = <T>(fn: () => T): T => fn();
