import { Link } from 'react-router-dom';
import { Button, Heading, HeadingLevel } from '@ariakit/react';
import GenericMessages from '@/components/GenericMessages';

function AnonymousHome() {
  return (
    <HeadingLevel>
      <Heading>Homepage non loggato</Heading>

      <GenericMessages />

      <div className="h-36"></div>
      {/* spacing needed for eventual bottom bar */}
      <div className="flex justify-center fixed bottom-0 w-full bg-neutral-900">
        <Button className="inline-block p-2 m-5 bg-blue-600 rounded">
          <Link to="/login">Accedi</Link>
        </Button>
        <Button className="inline-block p-2 m-5 bg-blue-600 rounded">
          <Link to="/signup">Iscriviti</Link>
        </Button>
      </div>
    </HeadingLevel>
  );
}

export default AnonymousHome;
