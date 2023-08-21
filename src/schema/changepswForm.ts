import { z } from 'zod';
import { passwRegex } from '@/lib/utils';

const pswSchema = z
  .string()
  .min(8, { message: 'La password deve avere minimo 8 caratteri.' })
  .max(40, { message: 'La password deve essere al massimo 40 caratteri' })
  .regex(passwRegex, {
    message:
      'La password deve avere minimo 8 caratteri. Di cui uno maiuscolo, uno speciale e un numero',
  });

export const changepswSchema = z
  .object({
    oldPassword: pswSchema,
    password: pswSchema,
    confirmPassword: pswSchema,
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Le password non coincidono',
  });

export type changepswSchema_t = z.infer<typeof changepswSchema>;
