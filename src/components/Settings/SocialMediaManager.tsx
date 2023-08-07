import {
  Button,
  Form,
  FormInput,
  useFormStore,
  FormSubmit,
} from '@ariakit/react';
import { useAuthUser } from 'react-auth-kit';

const SocialMediaManager = () => {
  const user = useAuthUser()();
  if (!user) return <div>Errore utente non definito</div>; //Should never happen

  const smmForm = useFormStore({ defaultValues: { SMM: '' } });
  smmForm.useSubmit(async (state) => {
    // TODO: api call per cambiare il SMM
    console.log(state.values.SMM);
  });

  return (
    <>
      <p>
        {user.SMM
          ? `Il tuo Social Media Manager è ${user.SMM}`
          : 'Non hai un Social Media Manager'}
      </p>
      <Form store={smmForm}>
        <FormInput
          name={smmForm.names.SMM}
          type="text"
          placeholder="Inserisci l'username del tuo Social Media Manager"
          minLength={3}
          maxLength={20}
          required
        />
        <FormSubmit>Scegli</FormSubmit>
      </Form>
    </>
  );
};

export default SocialMediaManager;
