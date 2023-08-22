import { z } from 'zod';
import { changepswSchema } from './shared-schema/changepswValidator';

export const changepswFormSchema = changepswSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Le password non coincidono',
  });

export type changepswForm_t = z.infer<typeof changepswFormSchema>;
