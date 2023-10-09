import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export function validateArray<T extends z.ZodTypeAny>(
  data: unknown[],
  schema: T,
): T['_output'][] {
  const validatedData: T['_output'][] = [];

  for (const element of data) {
    const validatedElement = schema.safeParse(element);
    if (validatedElement.success) validatedData.push(validatedElement.data);
    else {
      console.log(`Element ${element} failed validation`); //TODO: remove this log
      console.log(
        fromZodError(validatedElement.error, {
          unionSeparator: 'oppure',
          issueSeparator: '\n',
        }).message,
      ); //TODO: remove this log
    }
  }

  return validatedData;
}

export function validateElement<T extends z.ZodTypeAny>(
  data: unknown,
  schema: T,
): T['_output'] {
  const validatedElement = schema.safeParse(data);
  if (validatedElement.success) {
    return validatedElement.data;
  } else {
    throw fromZodError(validatedElement.error, {
      unionSeparator: 'oppure',
      issueSeparator: '\n',
    });
  }
}
