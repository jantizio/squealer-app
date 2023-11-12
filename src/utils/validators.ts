import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

function validateArray<T extends z.ZodTypeAny>(
  data: unknown[],
  schema: T,
): z.infer<T>[] {
  const validatedData: z.infer<T>[] = [];

  for (const element of data) {
    const validatedElement = schema.safeParse(element);
    if (validatedElement.success) validatedData.push(validatedElement.data);
    else {
      console.log(
        fromZodError(validatedElement.error, {
          unionSeparator: 'oppure',
          issueSeparator: '\n',
        }).message,
      );
    }
  }

  return validatedData;
}

/**
 * If the schema and the data are both arrays,
 * it will override the default parse method for arrays
 *
 * @param data data to validate
 * @param schema schema to validate data against
 * @returns clean data
 */
export function validate<T extends z.ZodTypeAny>(
  data: unknown,
  schema: T,
): z.infer<T> {
  if (Array.isArray(data) && schema instanceof z.ZodArray) {
    return validateArray(data, schema.element);
  } else {
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
}
