import useLogin from '@/hooks/useLogin';
import { user_t } from '@/globals/types';

const API_URL = import.meta.env.VITE_API_URL;

export default function useRegister() {
  const loginUser = useLogin();

  return async (newUser: user_t) => {
    fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    }).then((data) => data.json());
    const creds = {
      email: newUser.email,
      password: newUser.password,
    };
    //TODO: check if registration is successful
    //TODO: log in the user now
    return loginUser(creds);
  };
}
