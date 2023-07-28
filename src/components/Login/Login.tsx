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
    <div className={formCSS.wrapper}>
      <Form
        store={loginForm}
        aria-labelledby="register"
        className={formCSS.form}
      >
        <HeadingLevel>
          <Heading id="register" className={formCSS.heading}>
            Accedi
          </Heading>
          <div className={formCSS.field}>
            <FormLabel
              name={loginForm.names.username}
              className={formCSS.label}
            >
              Username
            </FormLabel>
            <FormInput
              name={loginForm.names.username}
              placeholder="Inserisci la tua username..."
              className={formCSS.input}
              required
            />

            <FormError
              name={loginForm.names.username}
              className={formCSS.error}
            />
          </div>
          <div className={formCSS.field}>
            <FormLabel
              name={loginForm.names.password}
              className={formCSS.label}
            >
              Password
            </FormLabel>
            <FormInput
              name={loginForm.names.password}
              type="password"
              placeholder="Inserisci la tua password..."
              className={formCSS.input}
              required
            />

            <FormError
              name={loginForm.names.password}
              className={formCSS.error}
            />
          </div>
          <FormSubmit className={formCSS.button}>Accedi</FormSubmit>
        </HeadingLevel>
      </Form>
    </div>
  );
}

export default Login;
