import { useSearchParams } from 'react-router-dom';
import { AskForReset } from './AskForReset';
import { InsertPassword } from './InsertPassword';

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  return (
    <main className="container my-14">
      {token ? <InsertPassword token={token} /> : <AskForReset />}
    </main>
  );
};
