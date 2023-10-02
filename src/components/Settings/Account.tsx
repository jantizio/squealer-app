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
import useAuth from '@/hooks/auth/useAuth';
import useLogout from '@/hooks/auth/useLogout';
import useAxios from '@/hooks/useAxios';
import {
  changepswFormSchema,
  changepswForm_t,
} from '@/schema/changepswValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const Account = () => {
  const privateApi = useAxios();
  const { state } = useAuth();
  const logout = useLogout();

  const changePswdForm = useForm<changepswForm_t>({
    resolver: zodResolver(changepswFormSchema),
    defaultValues: { oldPassword: '', password: '', confirmPassword: '' },
  });

  if (!state.authUser) return <div>Errore utente non definito</div>; //Should never happen

  const changepwsdHandler = changePswdForm.handleSubmit(async (values) => {
    alert(JSON.stringify(values));
  });

  const deleteAccount = async () => {
    privateApi.delete(`/users/${state.authUser?.username}`);
    // TODO: gestire meglio l'errore
    // forse devo usare useMutation?
  };

  return (
    <>
      <H2>Gestisci il tuo account</H2>
      <section className="mt-6 space-y-7">
        <section className="flex flex-wrap items-center gap-3">
          <H3>Cambio password</H3>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">Cambia</Button>
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
                    <Button type="submit">Salva</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </section>

        <section className="flex flex-wrap items-center gap-3">
          <H3>Logout</H3>
          <Button onClick={logout}>Logout</Button>
        </section>

        <section className="flex flex-wrap items-center gap-3">
          <H3>Elimina Account</H3>
          <Button variant="destructive" onClick={deleteAccount}>
            Elimina Account
          </Button>
        </section>
      </section>
    </>
  );
};

export default Account;
