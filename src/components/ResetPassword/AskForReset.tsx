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
import { A, H1 } from '@/components/ui/typography';
import { useAskForPasswordResetMutation } from '@/hooks/useUsers';
import { emailString, userString } from '@/schema/shared-schema/utils/global';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  usernameOrEmail: userString.or(emailString),
});

export const AskForReset = () => {
  const {
    mutate: askForReset,
    data,
    isPending,
  } = useAskForPasswordResetMutation();
  const askForResetPasswordForm = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      usernameOrEmail: '',
    },
  });

  const onSubmit = askForResetPasswordForm.handleSubmit((data) => {
    askForReset(data, {
      onSuccess(data) {
        console.log(data);
      },
    });
  });

  return (
    <>
      <Form {...askForResetPasswordForm}>
        <form
          onSubmit={onSubmit}
          className="mx-auto flex max-w-lg flex-col rounded-md border bg-accent [&>*]:p-4"
        >
          <H1>Resetta la password</H1>

          <FormField
            control={askForResetPasswordForm.control}
            name="usernameOrEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username o Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Inserisci il tuo username o la tua email"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Inserisci il tuo username o la tua email per ricevere il link
                  per il reset della password. Il nome utente deve iniziare con
                  la chiocciola (@).
                </FormDescription>
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
            Cambia password
          </Button>
        </form>
      </Form>
      {!!data && (
        <Alert variant="attention" className="mx-auto mt-2 max-w-md">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Link per il reset</AlertTitle>
          <AlertDescription>
            Per semplicità questo è il link che riceveresti nella mail:{' '}
            <A href={`/reset_password?token=${data.token}`}>Clicca qui</A>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};
