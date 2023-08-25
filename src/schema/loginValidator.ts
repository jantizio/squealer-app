import { loginSchema } from '@/schema/shared-schema/loginValidator';
import { standardString } from './shared-schema/utils/global';
import { z } from 'zod';

export const loginFormSchema = loginSchema.extend({
  username: standardString,
});
export type loginForm_t = z.infer<typeof loginFormSchema>;
