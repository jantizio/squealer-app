import {
  Form,
  useFormStore,
  FormLabel,
  FormInput,
  FormError,
  FormSubmit,
} from '@ariakit/react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import useLogin from '@/hooks/useLogin';

function Login() {
  const form = useFormStore({ defaultValues: { email: '', password: '' } });
  const navigate = useNavigate();
  const loginUser = useLogin();

  form.useSubmit(async (state) => {
    alert(JSON.stringify(state.values));

    const success = await loginUser(state.values);

    if (success) {
      alert('login successful');
      navigate('/');
    } else alert('login failed');
  });

  return (
    <div className="wrapper">
      <Form store={form} aria-labelledby="register" className="form">
        <h2 id="register" className="heading">
          Accedi
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
        <FormSubmit className="button">Accedi</FormSubmit>
      </Form>
    </div>
  );
}

export default Login;
