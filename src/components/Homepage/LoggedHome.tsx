import { LoggedHeader } from '@/components/Header';
import { MessageScroller } from '@/components/MessageScroller';
import { PenSquare } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDebounce } from 'usehooks-ts';
import { ChannelsSidebar } from './ChannelsSidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const LoggedHome = () => {
  const [filter, setFilter] = useState('');
  const debouncedFilter = useDebounce(filter, 500);

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

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="fixed bottom-3 right-3" asChild>
            <Link to="/create">
              <PenSquare className="h-icon-lg w-icon-lg" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Nuovo Squeal</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <footer className="order-last w-full p-4"></footer>
    </>
  );
};
