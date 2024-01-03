import { useResetPasswordMutation } from '@/hooks/useUsers';
import { useMemo } from 'react';
import jwtDecode from 'jwt-decode';
import {
  changepswFormSchema,
  type changepswForm_t,
} from '@/schema/changepswValidator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Loader2 } from 'lucide-react';

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

  if (!tokenPayload) return <>Errore token non valido</>; // TODO: better error handling

  const resetPswHandler = resetPasswordForm.handleSubmit((data) => {
    console.log(data);
    resetPsw({
      usernameOrEmail: tokenPayload.username,
      password: data.password,
      token,
    });
  });

  return (
    <Form {...resetPasswordForm}>
      <form onSubmit={resetPswHandler} className="flex flex-col gap-4 py-4">
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

        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Salva
        </Button>
      </form>
    </Form>
  );
};
