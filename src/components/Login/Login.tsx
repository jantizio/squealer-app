import { Button } from '@/components/ui/button';
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
import { H1 } from '@/components/ui/typography';
import { useLogin } from '@/hooks/useLogin';
import { loginFormSchema, type loginForm_t } from '@/schema/loginValidator';
import { type login_t } from '@/schema/shared-schema/loginValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

export const Login = () => {
  const loginForm = useForm<loginForm_t>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const { loginUser, isLoading } = useLogin();

  const loginUserHandler = loginForm.handleSubmit(
    (values) => {
      const credentials: login_t = {
        username: `@${values.username}`,
        password: values.password,
      };

      loginUser(credentials);
    },
    (err) => console.log('err', err),
  );

  return (
    <main className="container my-14">
      <Form {...loginForm}>
        <form
          onSubmit={loginUserHandler}
          className="mx-auto flex max-w-lg flex-col rounded-md border bg-accent [&>*]:p-4"
        >
          <H1>Accedi</H1>
          <FormField
            control={loginForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Utente</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Inserisci il tuo username..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
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

          <Button
            type="submit"
            className="mx-auto mb-4 w-5/12"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Accedi
          </Button>
        </form>
      </Form>
    </main>
  );
};
