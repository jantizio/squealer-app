import {
  Form,
  useFormStore,
  FormLabel,
  FormInput,
  FormError,
  FormSubmit,
} from '@ariakit/react';
import './Login.css';

function App() {
  const form = useFormStore({ defaultValues: { email: '', password: '' } });

  form.useSubmit(async (state) => {
    alert(JSON.stringify(state.values));
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

export default App;
