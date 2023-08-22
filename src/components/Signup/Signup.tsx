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
import useRegister from '@/hooks/useRegister';
import { user_t } from '@/lib/types';
import { registerFormSchema, registerForm_t } from '@/schema/registerValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

function Signup() {
  const signupForm = useForm<registerForm_t>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      username: '',
      firstname: '',
      lastname: '',
      password: '',
      confirmPassword: '',
    },
  });
  const registerUser = useRegister();

  const signupHandler = signupForm.handleSubmit((values) => {
    const { confirmPassword, ...rest } = values;
    const newUser: user_t = {
      type: 'standard',
      verified: false,
      SMM: null,
      quota: { day: 0, week: 0, month: 0 },
      ...rest,
    };

    console.log('data', newUser);
    registerUser(newUser);
  });

  return (
    <main className="container my-14">
      <Form {...signupForm}>
        <form
          onSubmit={signupHandler}
          className="flex flex-col mx-auto max-w-lg border rounded-md bg-accent [&>*]:p-4"
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
          <Button type="submit" className="w-5/12 mx-auto mb-4">
            Registrati
          </Button>
        </form>
      </Form>
    </main>
  );
}

export default Signup;
