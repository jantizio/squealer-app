import { useNavigate } from 'react-router-dom';
import { Button, Heading, HeadingLevel } from '@ariakit/react';
import GenericMessages from '@/components/GenericMessages';

function AnonymousHome() {
  const navigate = useNavigate();
  return (
    <HeadingLevel>
      <Heading>Homepage non loggato</Heading>

      <GenericMessages />

      <div className="h-36"></div>
      {/* spacing needed for eventual bottom bar */}
      <div className="flex justify-center fixed bottom-0 w-full bg-neutral-900">
        <Button
          className="inline-block p-2 m-5 bg-blue-600 rounded"
          onClick={() => navigate('/login')}
        >
          Accedi
        </Button>
        <Button
          className="inline-block p-2 m-5 bg-blue-600 rounded"
          onClick={() => navigate('/signup')}
        >
          Iscriviti
        </Button>
      </div>
    </HeadingLevel>
  );
}

export default AnonymousHome;
