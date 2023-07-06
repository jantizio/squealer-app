import useLogin from '@/hooks/useLogin';

const API_URL = import.meta.env.VITE_API_URL;

export type user_t = {
  id: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  type: 'standard' | 'professional' | 'moderator';
  verified: false;
  SMM: string | null;
};

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
