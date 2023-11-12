import { useUserContext } from '@/components/CurrentUserContext';
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
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

export const SocialMediaManager = () => {
  const authUser = useUserContext();

  const smmForm = useForm({ defaultValues: { SMM: '' } });

  if (!authUser) {
    throw new Error('CurrentUserContext: No value provided');
  }

  const changeSmmHandler = smmForm.handleSubmit(async (values) => {
    // TODO: api call per cambiare il SMM
    console.log(values.SMM);
  });

  const isLoading = false; //TODO: use real data from useMutation

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
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salva
              </Button>
            </form>
          </Form>
        </section>

        <section>
          <H3>Social Media Manager Attuale</H3>
          <P>
            {authUser.SMM
              ? `Il tuo Social Media Manager è ${authUser.SMM}`
              : 'Non hai un Social Media Manager'}
          </P>
        </section>
      </section>
    </>
  );
};
