// Tailwind CSS utility
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Type guards
export function errorCheck(error: unknown): error is Error {
  return error instanceof Error;
}

export const run = <T>(fn: () => T): T => fn();
