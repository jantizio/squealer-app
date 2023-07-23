import {
  Form,
  useFormStore,
  FormLabel,
  FormInput,
  FormError,
  FormSubmit,
} from '@ariakit/react';
import useRegister from '@/hooks/useRegister';
import { user_t } from '@/globals/types';

// TODO: se vuoi migliorare la validazione del form, puoi usare zod (https://github.com/ariakit/ariakit/discussions/1925)
// quella built-in è buona, però non ha un messaggio di errore personalizzato

function Signup() {
  const form = useFormStore({
    defaultValues: {
      email: '',
      username: '',
      firstname: '',
      lastname: '',
      password: '',
    },
  });
  const registerUser = useRegister();

  form.useSubmit(async (state) => {
    const newUser: user_t = {
      type: 'standard',
      verified: false,
      SMM: null,
      ...state.values,
    };

    console.log('data', JSON.stringify(newUser));
    registerUser(newUser);
  });

  return (
    <div className="wrapper">
      <Form store={form} aria-labelledby="register" className="form">
        <h2 id="register" className="heading">
          Registrati
        </h2>
        <div className="field">
          <FormLabel name={form.names.email} className="label">
            Email
          </FormLabel>
          <FormInput
            name={form.names.email}
            placeholder="Inserisci la tua email..."
            className="input"
            minLength={3}
            maxLength={20}
            type="email"
            required
          />

          <FormError name={form.names.email} className="error" />
        </div>
        <div className="field">
          <FormLabel name={form.names.username} className="label">
            Username
          </FormLabel>
          <FormInput
            name={form.names.username}
            placeholder="Inserisci il tuo username..."
            className="input"
            minLength={3}
            maxLength={20}
            type="text"
            required
          />

          <FormError name={form.names.username} className="error" />
        </div>
        <div className="field">
          <FormLabel name={form.names.firstname} className="label">
            Nome
          </FormLabel>
          <FormInput
            name={form.names.firstname}
            placeholder="Inserisci il tuo nome..."
            className="input"
            minLength={3}
            maxLength={20}
            type="text"
            required
          />

          <FormError name={form.names.firstname} className="error" />
        </div>
        <div className="field">
          <FormLabel name={form.names.lastname} className="label">
            Cognome
          </FormLabel>
          <FormInput
            name={form.names.lastname}
            placeholder="Inserisci il tuo cognome..."
            className="input"
            minLength={3}
            maxLength={20}
            type="text"
            required
          />

          <FormError name={form.names.lastname} className="error" />
        </div>
        <div className="field">
          <FormLabel name={form.names.password} className="label">
            Password
          </FormLabel>
          <FormInput
            name={form.names.password}
            placeholder="Inserisci la tua password..."
            className="input"
            minLength={8}
            maxLength={40}
            type="password"
            pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
            required
          />

          <FormError name={form.names.password} className="error" />
        </div>
        <FormSubmit className="button">Registrati</FormSubmit>
      </Form>
    </div>
  );
}

export default Signup;
