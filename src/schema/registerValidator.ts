import { z } from 'zod';
import { userWriteSchema } from './shared-schema/userValidators';

export const registerFormSchema = userWriteSchema
  .omit({
    type: true,
    SMM: true,
  })
  .extend({
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Le password non coincidono',
  });

export type registerForm_t = z.infer<typeof registerFormSchema>;
