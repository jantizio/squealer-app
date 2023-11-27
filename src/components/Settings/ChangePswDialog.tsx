import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  changepswFormSchema,
  type changepswForm_t,
} from '@/schema/changepswValidator';
import { Loader2 } from 'lucide-react';
import { useChangePasswordMutation } from '@/hooks/useUsers';
import { useUserContext } from '@/components/CurrentUserContext';
import { useEffect } from 'react';

export const ChangePswDialog = () => {
  const authUser = useUserContext();
  if (!authUser) {
    throw new Error('CurrentUserContext: No value provided');
  }
  const { mutate, isPending, isSuccess } = useChangePasswordMutation();

  const changePswdForm = useForm<changepswForm_t>({
    resolver: zodResolver(changepswFormSchema),
    defaultValues: { oldPassword: '', password: '', confirmPassword: '' },
  });

  const changepwsdHandler = changePswdForm.handleSubmit((values) => {
    mutate({
      username: authUser.username,
      oldPassword: values.oldPassword,
      password: values.password,
    });
  });

  const isSubmitSuccessful =
    changePswdForm.formState.isSubmitSuccessful && isSuccess;

  useEffect(() => {
    if (isSubmitSuccessful) {
      changePswdForm.reset({});
    }
  }, [isSubmitSuccessful]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Cambia</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cambia Password</DialogTitle>
          <DialogDescription>
            Inserisci la tua nuova password, clicca salva quando hai finito
          </DialogDescription>
        </DialogHeader>
        <Form {...changePswdForm}>
          <form
            onSubmit={changepwsdHandler}
            className="flex flex-col gap-4 py-4"
          >
            <FormField
              control={changePswdForm.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vecchia Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Inserisci la vecchia password..."
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={changePswdForm.control}
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
              control={changePswdForm.control}
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
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salva
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
