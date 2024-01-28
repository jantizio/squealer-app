import { Button } from '@/components/ui/button';
import { H1, Muted, P } from '@/components/ui/typography';
import { errorMessage } from '@/utils/type-guards';
import { useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="mx-auto mt-52 text-center">
      <H1>Oops!</H1>
      <P>Si è verificato un errore inaspettato</P>
      <Muted>{errorMessage(error)}</Muted>
      <Button className="mt-4" onClick={() => window.location.reload()}>
        Riprova
      </Button>
    </div>
  );
};
