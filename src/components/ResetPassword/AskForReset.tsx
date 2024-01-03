import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
import { A } from '@/components/ui/typography';
import { useAskForPasswordResetMutation } from '@/hooks/useUsers';
import { emailString, userString } from '@/schema/shared-schema/utils/global';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';

const schema = z.object({
  usernameOrEmail: userString.or(emailString),
});

export const AskForReset = () => {
  const { mutate: askForReset, data } = useAskForPasswordResetMutation();
  const askForResetPasswordForm = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      usernameOrEmail: '',
    },
  });

  const onSubmit = askForResetPasswordForm.handleSubmit((data) => {
    console.log(data);
    askForReset(data, {
      onSuccess(data) {
        console.log(data);
      },
    });
  });

  return (
    <>
      <Form {...askForResetPasswordForm}>
        <form onSubmit={onSubmit}>
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
          <Button type="submit">Cambia password</Button>
        </form>
      </Form>
      {!!data && (
        <Alert>
          <AlertTitle>Link per il reset</AlertTitle>
          <AlertDescription>
            Per semplicità questo è il link che riceveresti nella mail:{' '}
            <A href={data.link} external>
              Clicca qui
            </A>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};
