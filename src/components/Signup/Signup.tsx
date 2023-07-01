import {
  Form,
  useFormStore,
  FormLabel,
  FormInput,
  FormError,
  FormSubmit,
} from '@ariakit/react';
import { useNavigate } from 'react-router-dom';
import useRegister, { user_t } from '@/hooks/useRegister';

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
  const navigate = useNavigate();
  const registerUser = useRegister();

  form.useSubmit(async (state) => {
    const newUser: user_t = {
      id: '0', // TODO
      type: 'standard',
      verified: false,
      SMM: null,
      ...state.values,
    };

    alert(JSON.stringify(newUser));
    const success = await registerUser(newUser);

    if (success) {
      alert('registration successful');
      navigate('/');
    } else {
      alert('registration failed');
    }
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
            type="password"
            placeholder="Inserisci la tua password..."
            className="input"
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
