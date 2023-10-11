export function errorCheck(error: unknown): error is Error {
  return error instanceof Error;
}

export function errorPayloadCheck(data: unknown): data is { message: string } {
  return data instanceof Object && 'message' in data;
}

import { type errorMessages_t } from '@/utils/types';
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
    if (key !== 'generic' && !/^[0-9]+$/.test(key)) {
      return false;
    }
  }

  return true;
}
