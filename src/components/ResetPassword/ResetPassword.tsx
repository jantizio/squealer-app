import { useSearchParams } from 'react-router-dom';
import { AskForReset } from './AskForReset';
import { InsertPassword } from './InsertPassword';

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  if (!token) return <AskForReset />;
  else return <InsertPassword token={token} />;
};
