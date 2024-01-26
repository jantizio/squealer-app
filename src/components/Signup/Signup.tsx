import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputAt } from '@/components/ui/input-at';
import { H1 } from '@/components/ui/typography';
import { useRegister } from '@/hooks/useRegister';
import {
  registerFormSchema,
  type registerForm_t,
} from '@/schema/registerValidator';
import type { userWrite_t } from '@/utils/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

export const Signup = () => {
  const signupForm = useForm<registerForm_t>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      username: '',
      firstname: '',
      lastname: '',
      isProfessional: false,
      password: '',
      confirmPassword: '',
    },
  });
  const { registerUser, isPending } = useRegister();

  const signupHandler = signupForm.handleSubmit(
    (values) => {
      const { confirmPassword, username, isProfessional, ...rest } = values;
      const newUser: userWrite_t = {
        type: isProfessional ? 'professional' : 'standard',
        username: `@${username}`,
        ...rest,
      };

      registerUser(newUser);
    },
    (err) => console.log('err', err),
  );

  return (
    <main className="container my-14 pb-7">
      <Form {...signupForm}>
        <form
          onSubmit={signupHandler}
          className="mx-auto flex max-w-lg flex-col rounded-md border bg-accent [&>*]:p-4"
        >
          <H1>Registrati</H1>

          <FormField
            control={signupForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Inserisci la tua email..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={signupForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Utente</FormLabel>
                <FormControl>
                  <InputAt
                    {...field}
                    placeholder="Inserisci il tuo username..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signupForm.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Inserisci il tuo nome..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signupForm.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cognome</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Inserisci il tuo cognome..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signupForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Inserisci la tua password..."
                  />
                </FormControl>
                <FormDescription>
                  La password deve essere di almeno 8 caratteri. Deve avere un
                  carattere maiuscolo, un numero e un simbolo speciale.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signupForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conferma Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Conferma la password..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signupForm.control}
            name="isProfessional"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Vuoi creare un account professionale?</FormLabel>
                  <FormDescription>
                    Un account professionale ti permetterà di accedere a
                    funzionalità per influencer e social media manager.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mx-auto mb-4 w-5/12"
            disabled={isPending}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Registrati
          </Button>
        </form>
      </Form>
    </main>
  );
};
