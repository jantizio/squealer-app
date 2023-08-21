import { z } from 'zod';
import { passwRegex } from './utils/global';

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Il nome utente deve essere di almeno 3 caratteri' })
    .max(20, { message: 'Il nome utente deve essere al massimo 20 caratteri' }),
  password: z
    .string()
    .min(8, { message: 'La password deve avere minimo 8 caratteri.' })
    .max(40, { message: 'La password deve essere al massimo 40 caratteri' })
    .regex(passwRegex, {
      message:
        'La password deve avere minimo 8 caratteri. Di cui uno maiuscolo, uno speciale e un numero',
    }),
});

export type loginSchema_t = z.infer<typeof loginSchema>;
