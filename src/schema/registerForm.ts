import { z } from 'zod';
import { passwRegex } from '@/lib/utils';

const standardString = z
  .string()
  .min(3, { message: 'Il nome utente deve essere di almeno 3 caratteri' })
  .max(20, { message: 'Il nome utente deve essere al massimo 20 caratteri' });

export const registerSchema = z
  .object({
    email: standardString,
    firstname: standardString,
    lastname: standardString,
    username: standardString,
    password: z
      .string()
      .min(8, { message: 'La password deve avere minimo 8 caratteri.' })
      .max(40, { message: 'La password deve essere al massimo 40 caratteri' })
      .regex(passwRegex, {
        message:
          'La password deve avere minimo 8 caratteri. Di cui uno maiuscolo, uno speciale e un numero',
      }),
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.password, {
    path: ['confirmPassword'],
    message: 'Le password non coincidono',
  });

export type registerSchema_t = z.infer<typeof registerSchema>;
