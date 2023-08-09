import {
  Form,
  useFormStore,
  FormLabel,
  FormInput,
  FormError,
  FormSubmit,
  HeadingLevel,
  Heading,
} from '@ariakit/react';
import formCSS from '../../styles/form.module.css';
import useRegister from '@/hooks/useRegister';
import { user_t } from '@/lib/types';
import { passwRegex } from '@/lib/utils';

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
      confirmPassword: '',
    },
  });
  const registerUser = useRegister();

  signupForm.useSubmit((state) => {
    const { confirmPassword, ...rest } = state.values;
    const newUser: user_t = {
      type: 'standard',
      verified: false,
      SMM: null,
      ...rest,
    };

    console.log('data', JSON.stringify(newUser));
    registerUser(newUser);
  });

  signupForm.useValidate(() => {
    const password = signupForm.getValue(signupForm.names.password);
    const confirmPassword = signupForm.getValue(
      signupForm.names.confirmPassword
    );

    if (password !== confirmPassword) {
      signupForm.setError(
        signupForm.names.confirmPassword,
        'Le password non coincidono'
      );
    }
  });

  return (
    <div className={formCSS.wrapper}>
      <Form
        store={signupForm}
        aria-labelledby="register"
        className={formCSS.form}
      >
        <HeadingLevel>
          <Heading id="register" className={formCSS.heading}>
            Registrati
          </Heading>
          <div className={formCSS.field}>
            <FormLabel name={signupForm.names.email} className={formCSS.label}>
              Email
            </FormLabel>
            <FormInput
              name={signupForm.names.email}
              placeholder="Inserisci la tua email..."
              className={formCSS.input}
              minLength={3}
              maxLength={20}
              type="email"
              required
            />

            <FormError
              name={signupForm.names.email}
              className={formCSS.error}
            />
          </div>
          <div className={formCSS.field}>
            <FormLabel
              name={signupForm.names.username}
              className={formCSS.label}
            >
              Username
            </FormLabel>
            <FormInput
              name={signupForm.names.username}
              placeholder="Inserisci il tuo username..."
              className={formCSS.input}
              minLength={3}
              maxLength={20}
              type="text"
              required
            />

            <FormError
              name={signupForm.names.username}
              className={formCSS.error}
            />
          </div>
          <div className={formCSS.field}>
            <FormLabel
              name={signupForm.names.firstname}
              className={formCSS.label}
            >
              Nome
            </FormLabel>
            <FormInput
              name={signupForm.names.firstname}
              placeholder="Inserisci il tuo nome..."
              className={formCSS.input}
              minLength={3}
              maxLength={20}
              type="text"
              required
            />

            <FormError
              name={signupForm.names.firstname}
              className={formCSS.error}
            />
          </div>
          <div className={formCSS.field}>
            <FormLabel
              name={signupForm.names.lastname}
              className={formCSS.label}
            >
              Cognome
            </FormLabel>
            <FormInput
              name={signupForm.names.lastname}
              placeholder="Inserisci il tuo cognome..."
              className={formCSS.input}
              minLength={3}
              maxLength={20}
              type="text"
              required
            />

            <FormError
              name={signupForm.names.lastname}
              className={formCSS.error}
            />
          </div>
          <div className={formCSS.field}>
            <FormLabel
              name={signupForm.names.password}
              className={formCSS.label}
            >
              Password
            </FormLabel>
            <FormInput
              name={signupForm.names.password}
              placeholder="Inserisci la tua password..."
              className={formCSS.input}
              minLength={8}
              maxLength={40}
              type="password"
              pattern={passwRegex}
              required
            />

            <FormError
              name={signupForm.names.password}
              className={formCSS.error}
            />
          </div>
          <div className={formCSS.field}>
            <FormLabel
              name={signupForm.names.confirmPassword}
              className={formCSS.label}
            >
              Conferma Password
            </FormLabel>
            <FormInput
              name={signupForm.names.confirmPassword}
              placeholder="Conferma la tua password..."
              className={formCSS.input}
              minLength={8}
              maxLength={40}
              type="password"
              pattern={passwRegex}
              required
            />

            <FormError
              name={signupForm.names.confirmPassword}
              className={formCSS.error}
            />
          </div>
          <FormSubmit className={formCSS.button}>Registrati</FormSubmit>
        </HeadingLevel>
      </Form>
    </div>
  );
}

export default Signup;
