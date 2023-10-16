import LoggedHeader from '@/components/Header/LoggedHeader';
import MessageScroller from '@/components/MessageScroller';
import { Button } from '@/components/ui/button';
import { useUser } from '@/lib/auth';
import { PenSquare } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'usehooks-ts';
import ChannelsSidebar from './ChannelsSidebar';

const LoggedHome = () => {
  const [filter, setFilter] = useState('');
  const debouncedFilter = useDebounce(filter, 500);
  const navigate = useNavigate();

  const { data: authUser } = useUser();
  if (!authUser) return <div>Errore utente non definito</div>; //Should never happen

  return (
    <>
      <LoggedHeader isHome setFilter={setFilter} />

      <div className="flex overflow-hidden">
        {/* Main content */}
        <main className="order-2 w-full overflow-auto overflow-x-hidden md:w-4/6 lg:w-1/2">
          <MessageScroller filter={debouncedFilter} />
        </main>

        {/* Left sidebar */}
        <aside className="order-1 hidden w-full overflow-auto overflow-x-hidden md:block md:w-2/6 lg:w-1/4">
          <ChannelsSidebar />
        </aside>

        {/* Right sidebar */}
        <aside className="order-3 hidden w-full overflow-hidden lg:block lg:w-1/4"></aside>
      </div>
      <Button
        className="fixed bottom-3 right-3"
        variant="unstyled"
        size="icon"
        onClick={() => navigate('/create')}
      >
        <PenSquare className="h-icon-lg w-icon-lg" />
      </Button>
      <footer className="order-last w-full p-4"></footer>
    </>
  );
};

export default LoggedHome;
