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
import useLogin from '@/hooks/useLogin';
import { loginFormSchema, loginForm_t } from '@/schema/loginValidator';
import { login_t } from '@/schema/shared-schema/loginValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

function Login() {
  const loginForm = useForm<loginForm_t>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const loginUser = useLogin();

  const loginUserHandler = loginForm.handleSubmit((values) => {
    const credentials: login_t = { ...values, username: `@${values.username}` };
    console.log('data', credentials); //TODO: remove log

    loginUser(credentials);
  });

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

          <Button type="submit" className="mx-auto mb-4 w-5/12">
            Accedi
          </Button>
        </form>
      </Form>
    </main>
  );
}

export default Login;
