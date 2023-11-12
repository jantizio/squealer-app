import { deleteUser } from '@/api/users';
import { useUserContext } from '@/components/CurrentUserContext';
import { Button } from '@/components/ui/button';
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
import { H2, H3 } from '@/components/ui/typography';
import { useLogout } from '@/hooks/useLogout';
import {
  changepswFormSchema,
  type changepswForm_t,
} from '@/schema/changepswValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

export const Account = () => {
  const authUser = useUserContext();
  const { logoutUser, isLoading: isLogoutLoading } = useLogout();

  const changePswdForm = useForm<changepswForm_t>({
    resolver: zodResolver(changepswFormSchema),
    defaultValues: { oldPassword: '', password: '', confirmPassword: '' },
  });

  if (!authUser) {
    throw new Error('CurrentUserContext: No value provided');
  }

  const changepwsdHandler = changePswdForm.handleSubmit(async (values) => {
    alert(JSON.stringify(values));
  });

  const deleteAccount = () => {
    logoutUser({});
    deleteUser(authUser.username);
    // TODO: gestire meglio l'errore
    // forse devo usare useMutation?
  };

  const isLoading = false; //TODO: use real data from useMutation

  return (
    <>
      <H2>Gestisci il tuo account</H2>
      <section className="mt-6 space-y-7">
        <section className="flex flex-wrap items-center gap-3">
          <H3>Cambio password</H3>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Cambia</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Cambia Password</DialogTitle>
                <DialogDescription>
                  Inserisci la tua nuova password, clicca salva quando hai
                  finito
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
                          La password deve essere di almeno 8 caratteri. Deve
                          avere un carattere maiuscolo, un numero e un simbolo
                          speciale.
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
                    <Button type="submit" disabled={isLoading}>
                      {isLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Salva
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </section>

        <section className="flex flex-wrap items-center gap-3">
          <H3>Logout</H3>
          <Button onClick={() => logoutUser({})} disabled={isLogoutLoading}>
            {isLogoutLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Logout
          </Button>
        </section>

        <section className="flex flex-wrap items-center gap-3">
          <H3>Elimina Account</H3>
          <Button
            variant="destructive"
            onClick={deleteAccount}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Elimina Account
          </Button>
        </section>
      </section>
    </>
  );
};
