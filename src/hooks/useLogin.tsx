import { useSignIn } from 'react-auth-kit';

const API_URL = import.meta.env.VITE_API_URL;

type creds_t = {
  email: string;
  password: string;
};

export default function useLogin() {
  const signIn = useSignIn();

  return async (credentials: creds_t) => {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());

    return signIn({
      token: res.data.token,
      expiresIn: res.data.expiresIn,
      tokenType: 'Bearer',
      authState: { id: res.data.userId, email: credentials.email },
    });
  };
}
