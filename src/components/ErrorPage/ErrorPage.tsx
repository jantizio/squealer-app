import { errorMessage } from '@/utils/type-guards';
import { useRouteError } from 'react-router-dom';
import { H1, Muted, P } from '@/components/ui/typography';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="mx-auto mt-52 text-center">
      <H1>Oops!</H1>
      <P>Sorry, an unexpected error has occurred.</P>
      <Muted>{errorMessage(error)}</Muted>
    </div>
  );
}
