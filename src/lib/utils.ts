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

export function errorPayloadCheck(data: unknown): data is { message: string } {
  return data instanceof Object && 'message' in data;
}

import { errorMessages_t } from '@/utils/types';
export function isErrorMessages(object: unknown): object is errorMessages_t {
  if (typeof object !== 'object' || object === null) {
    return false;
  }

  const requiredKeys = ['generic'];
  for (const key of requiredKeys) {
    if (!(key in object)) {
      return false;
    }
  }

  // Additional type checking for numeric keys
  for (const key in object) {
    if (key !== 'generic' && typeof key !== 'number') {
      return false;
    }
  }

  return true;
}

export const run = <T>(fn: () => T): T => fn();

import * as React from 'react';

// named imports for React.lazy: https://github.com/facebook/react/issues/14603#issuecomment-726551598
export function lazyImport<
  T extends React.ComponentType<any>,
  I extends { [K2 in K]: T },
  K extends keyof I,
>(factory: () => Promise<I>, name: K): I {
  return Object.create({
    [name]: React.lazy(() =>
      factory().then((module) => ({ default: module[name] })),
    ),
  });
}

// Usage
// const { Home } = lazyImport(() => import("./Home"), "Home");
