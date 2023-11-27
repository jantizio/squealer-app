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
import { useChangeSMMMutation, useRemoveSMMMutation } from '@/hooks/useUsers';
import {
  changeSMMFormSchema,
  type changeSMMForm_t,
} from '@/schema/changeSMMValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

export const SocialMediaManager = () => {
  const authUser = useUserContext();

  const smmForm = useForm<changeSMMForm_t>({
    resolver: zodResolver(changeSMMFormSchema),
    defaultValues: { SMM: '' },
  });

  const { mutate, isPending } = useChangeSMMMutation();
  const { mutate: removeSMM, isPending: isRemovePending } =
    useRemoveSMMMutation();

  if (!authUser) {
    throw new Error('CurrentUserContext: No value provided');
  }

  const changeSmmHandler = smmForm.handleSubmit((values) => {
    mutate({
      username: authUser.username,
      SMM: `@${values.SMM}`,
    });
  });

  return (
    <>
      <H2>Impostazioni Social Media Manager</H2>

      <section className="mt-6 space-y-6">
        <section>
          <H3>Cambia Social media manager</H3>
          <Form {...smmForm}>
            <form onSubmit={changeSmmHandler} className="mt-4 space-y-2">
              <FormField
                control={smmForm.control}
                name="SMM"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative before:pointer-events-none before:absolute before:left-3 before:top-[20%] before:text-muted-foreground before:content-['@'] [&>input]:pl-7">
                        <Input
                          {...field}
                          placeholder="username del tuo nuovo SMM"
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Inserisci l'username del tuo Social Media Manager
                    </FormDescription>
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
        </section>

        <section>
          <H3>Social Media Manager Attuale</H3>
          <P>
            {authUser.SMM
              ? `Il tuo Social Media Manager è ${authUser.SMM}`
              : 'Non hai un Social Media Manager'}
          </P>
          <Button
            onClick={() => {
              removeSMM({ username: authUser.username });
            }}
            disabled={isRemovePending}
          >
            {isRemovePending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Rimuovi
          </Button>
        </section>
      </section>
    </>
  );
};
