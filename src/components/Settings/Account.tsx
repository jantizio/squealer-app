import {
  Button,
  Separator,
  useFormStore,
  Form,
  FormInput,
  FormLabel,
  FormSubmit,
  FormError,
  HeadingLevel,
  Heading,
} from '@ariakit/react';
import { useAuthUser, useSignOut } from 'react-auth-kit';
import useAxios from '@/hooks/useAxios';
import { passwRegex } from '@/globals/utility';
import formCSS from '../../styles/form.module.css';

const Account = () => {
  const privateApi = useAxios();
  const authUser = useAuthUser()();
  const logout = useSignOut();

  const changePswd = useFormStore({
    defaultValues: { oldPassword: '', password: '', confirmPassword: '' },
  });

  changePswd.useSubmit(async (state) => {
    alert(JSON.stringify(state.values));
  });

  changePswd.useValidate(() => {
    const password = changePswd.getValue(changePswd.names.password);
    const confirmPassword = changePswd.getValue(
      changePswd.names.confirmPassword
    );

    if (password !== confirmPassword) {
      changePswd.setError(
        changePswd.names.confirmPassword,
        'Le password non coincidono'
      );
    }
  });

  const deleteAccount = async () => {
    if (authUser) privateApi.delete(`/users/${authUser.username}`);
    else console.error('User non trovato');
    // TODO: gestire meglio l'errore
    // forse devo usare useMutation?
  };

  return (
    <>
      <HeadingLevel>
        <Heading>Benvenuto {authUser?.username ?? 'guest'}</Heading>
        <Form
          store={changePswd}
          aria-labelledby="change-psw"
          className={formCSS.wrapper}
        >
          <HeadingLevel>
            <Heading id="change-psw" className={formCSS.heading}>
              Cambia password
            </Heading>
          </HeadingLevel>

          <div className={formCSS.field}>
            <FormLabel name={changePswd.names.oldPassword}>
              Vecchia Password
            </FormLabel>
            <FormInput
              name={changePswd.names.oldPassword}
              className={formCSS.input}
              minLength={8}
              maxLength={40}
              type="password"
              pattern={passwRegex}
              required
            />
            <FormError
              name={changePswd.names.oldPassword}
              className={formCSS.error}
            />
          </div>

          <div className={formCSS.field}>
            <FormLabel name={changePswd.names.password}>
              Nuova Password
            </FormLabel>
            <FormInput
              name={changePswd.names.password}
              className={formCSS.input}
              minLength={8}
              maxLength={40}
              type="password"
              pattern={passwRegex}
              required
            />
            <FormError
              name={changePswd.names.password}
              className={formCSS.error}
            />
          </div>

          <div className={formCSS.field}>
            <FormLabel name={changePswd.names.confirmPassword}>
              Vecchia Password
            </FormLabel>
            <FormInput
              name={changePswd.names.confirmPassword}
              className={formCSS.input}
              minLength={8}
              maxLength={40}
              type="password"
              pattern={passwRegex}
              required
            />
            <FormError
              name={changePswd.names.confirmPassword}
              className={formCSS.error}
            />
          </div>

          <FormSubmit className={formCSS.button}>Cambia</FormSubmit>
        </Form>
      </HeadingLevel>

      <Separator className="my-2 h-0 w-full border-t" />

      <Button
        className="border-2 border-red-800 rounded p-2 hover:bg-red-800/25 disabled:bg-orange-950"
        onClick={deleteAccount}
        disabled
      >
        Elimina Account
      </Button>

      <Separator className="my-2 h-0 w-full border-t" />

      <Button
        className="border-2 border-red-800 rounded p-2 hover:bg-red-800/25"
        onClick={() => logout()}
      >
        Logout
      </Button>
    </>
  );
};

export default Account;
