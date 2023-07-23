import {
  Form,
  useFormStore,
  FormLabel,
  FormInput,
  FormError,
  FormSubmit,
} from '@ariakit/react';
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

import useLogin from '@/hooks/useLogin';

function Login() {
  const loginForm = useFormStore({
    defaultValues: { username: '', password: '' },
  });
  const loginUser = useLogin();

  loginForm.useSubmit(async (state) => {
    console.log('data', JSON.stringify(state.values));

    loginUser(state.values);
  });

  return (
    <div className={wrapper}>
      <Form store={loginForm} aria-labelledby="register" className={form}>
        <h2 id="register" className={heading}>
          Accedi
        </h2>
        <div className={field}>
          <FormLabel name={loginForm.names.username} className={label}>
            Username
          </FormLabel>
          <FormInput
            name={loginForm.names.username}
            placeholder="Inserisci la tua username..."
            className={input}
            required
          />

          <FormError name={loginForm.names.username} className={error} />
        </div>
        <div className={field}>
          <FormLabel name={loginForm.names.password} className={label}>
            Password
          </FormLabel>
          <FormInput
            name={loginForm.names.password}
            type="password"
            placeholder="Inserisci la tua password..."
            className={input}
            required
          />

          <FormError name={loginForm.names.password} className={error} />
        </div>
        <FormSubmit className={button}>Accedi</FormSubmit>
      </Form>
    </div>
  );
}

export default Login;
