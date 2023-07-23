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
import {
  form,
  button,
  error,
  field,
  heading,
  input,
  label,
  wrapper,
} from '../../styles/form.module.css';

// TODO: se vuoi migliorare la validazione del form, puoi usare zod (https://github.com/ariakit/ariakit/discussions/1925)
// quella built-in è buona, però non ha un messaggio di errore personalizzato

function Signup() {
  const signupForm = useFormStore({
    defaultValues: {
      email: '',
      username: '',
      firstname: '',
      lastname: '',
      password: '',
    },
  });
  const registerUser = useRegister();

  signupForm.useSubmit(async (state) => {
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
    <div className={wrapper}>
      <Form store={signupForm} aria-labelledby="register" className={form}>
        <h2 id="register" className={heading}>
          Registrati
        </h2>
        <div className={field}>
          <FormLabel name={signupForm.names.email} className={label}>
            Email
          </FormLabel>
          <FormInput
            name={signupForm.names.email}
            placeholder="Inserisci la tua email..."
            className={input}
            minLength={3}
            maxLength={20}
            type="email"
            required
          />

          <FormError name={signupForm.names.email} className={error} />
        </div>
        <div className={field}>
          <FormLabel name={signupForm.names.username} className={label}>
            Username
          </FormLabel>
          <FormInput
            name={signupForm.names.username}
            placeholder="Inserisci il tuo username..."
            className={input}
            minLength={3}
            maxLength={20}
            type="text"
            required
          />

          <FormError name={signupForm.names.username} className={error} />
        </div>
        <div className={field}>
          <FormLabel name={signupForm.names.firstname} className={label}>
            Nome
          </FormLabel>
          <FormInput
            name={signupForm.names.firstname}
            placeholder="Inserisci il tuo nome..."
            className={input}
            minLength={3}
            maxLength={20}
            type="text"
            required
          />

          <FormError name={signupForm.names.firstname} className={error} />
        </div>
        <div className={field}>
          <FormLabel name={signupForm.names.lastname} className={label}>
            Cognome
          </FormLabel>
          <FormInput
            name={signupForm.names.lastname}
            placeholder="Inserisci il tuo cognome..."
            className={input}
            minLength={3}
            maxLength={20}
            type="text"
            required
          />

          <FormError name={signupForm.names.lastname} className={error} />
        </div>
        <div className={field}>
          <FormLabel name={signupForm.names.password} className={label}>
            Password
          </FormLabel>
          <FormInput
            name={signupForm.names.password}
            placeholder="Inserisci la tua password..."
            className={input}
            minLength={8}
            maxLength={40}
            type="password"
            pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
            required
          />

          <FormError name={signupForm.names.password} className={error} />
        </div>
        <FormSubmit className={button}>Registrati</FormSubmit>
      </Form>
    </div>
  );
}

export default Signup;
