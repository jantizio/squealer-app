import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { H1 } from '@/components/ui/typography';
import useLogin from '@/hooks/useLogin';
import { loginSchema, loginSchema_t } from '@/schema/loginForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

function Login() {
  const loginForm = useForm<loginSchema_t>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const loginUser = useLogin();

  const loginUserHandler = loginForm.handleSubmit((values) => {
    console.log('data', JSON.stringify(values)); //TODO: remove log

    loginUser(values);
  });

  return (
    <main className="container my-14">
      <Form {...loginForm}>
        <form
          onSubmit={loginUserHandler}
          className="flex flex-col mx-auto max-w-lg border rounded-md bg-accent [&>*]:p-4"
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
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-5/12 mx-auto mb-4">
            Accedi
          </Button>
        </form>
      </Form>
    </main>
  );
}

export default Login;
