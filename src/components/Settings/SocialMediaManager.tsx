import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { H2, H3, P } from '@/components/ui/typography';
import { userCheck } from '@/lib/utils';
import { useAuthUser } from 'react-auth-kit';
import { useForm } from 'react-hook-form';

const SocialMediaManager = () => {
  const user = useAuthUser()();

  const smmForm = useForm({ defaultValues: { SMM: '' } });

  if (!userCheck(user)) return <div>Errore utente non definito</div>; //Should never happen

  const changeSmmHandler = smmForm.handleSubmit(async (values) => {
    // TODO: api call per cambiare il SMM
    console.log(values.SMM);
  });

  return (
    <>
      <H2>Impostazioni Social Media Manager</H2>

      <section className="mt-6 space-y-6">
        <section>
          <H3>Cambia Social media manager</H3>
          <Form {...smmForm}>
            <form onSubmit={changeSmmHandler} className="mt-4">
              <FormField
                control={smmForm.control}
                name="SMM"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} minLength={3} maxLength={20} required />
                    </FormControl>
                    <FormDescription>
                      Inserisci l'username del tuo Social Media Manager
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Salva</Button>
            </form>
          </Form>
        </section>

        <section>
          <H3>Social Media Manager Attuale</H3>
          <P>
            {user.SMM
              ? `Il tuo Social Media Manager è ${user.SMM}`
              : 'Non hai un Social Media Manager'}
          </P>
        </section>
      </section>
    </>
  );
};

export default SocialMediaManager;
