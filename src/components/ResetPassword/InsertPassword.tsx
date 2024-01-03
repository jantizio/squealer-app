import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
import { useResetPasswordMutation } from '@/hooks/useUsers';
import {
  changepswFormSchema,
  type changepswForm_t,
} from '@/schema/changepswValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import jwtDecode from 'jwt-decode';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

type Props = Readonly<{
  token: string;
}>;

export const InsertPassword = ({ token }: Props) => {
  const { mutate: resetPsw, isPending } = useResetPasswordMutation();

  const tokenPayload = useMemo(() => {
    try {
      return jwtDecode<{ username: string; email: string }>(token);
    } catch (error) {}
  }, [token]);

  const resetPasswordForm = useForm<changepswForm_t>({
    resolver: zodResolver(changepswFormSchema),
    defaultValues: {
      oldPassword: 'Vecchiapsw.1',
      password: '',
      confirmPassword: '',
    },
  });

  if (!tokenPayload)
    return (
      <Alert variant="destructive" className="container mt-14 w-11/12 max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Errore</AlertTitle>
        <AlertDescription>
          Autenticazione non riuscita, torna indietro e riprova.
        </AlertDescription>
      </Alert>
    );

  const resetPswHandler = resetPasswordForm.handleSubmit((data) => {
    resetPsw({
      usernameOrEmail: tokenPayload.username,
      password: data.password,
      token,
    });
  });

  return (
    <Form {...resetPasswordForm}>
      <form
        onSubmit={resetPswHandler}
        className="mx-auto flex max-w-lg flex-col rounded-md border bg-accent [&>*]:p-4"
      >
        <H1>Resetta la password</H1>

        <FormField
          control={resetPasswordForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nuova Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Inserisci la nuova password..."
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
          control={resetPasswordForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conferma nuova password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Conferma la nuova password..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="mx-auto mb-4 w-5/12"
          disabled={isPending}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Salva
        </Button>
      </form>
    </Form>
  );
};
