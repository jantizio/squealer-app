import { z } from 'zod';
import { userWriteSchema } from './shared-schema/userValidators';
import { standardString } from './shared-schema/utils/global';

export const registerFormSchema = userWriteSchema
  .omit({
    type: true,
  })
  .extend({
    confirmPassword: z.string(),
    username: standardString,
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Le password non coincidono',
  });

export type registerForm_t = z.infer<typeof registerFormSchema>;
