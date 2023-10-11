import ChannelList from '@/components/ChannelList';
import HeaderLogo from '@/components/HeaderLogo';
import MessageScroller from '@/components/MessageScroller';
import ModeToggle from '@/components/ModeToggle';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useFetchChannels, useFetchSqueals } from '@/hooks/useFetch';
import { channelSchema } from '@/schema/shared-schema/channelValidator';
import { validate } from '@/utils/validators';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const channels = [
  {
    type: 'public',
    name: '§general',
    description: 'General discussion about Squealer',
    subscribed: ['@john_doe', '@jane_doe'],
  },
  {
    type: 'public',
    name: 'announcements',
    description: 'Official announcements from Squealer',
    subscribed: ['@john_doe', '@jane_doe', '@jim_smith'],
  },
  {
    type: 'public',
    name: '#random',
    description: 'Random discussion about anything',
    subscribed: ['@jane_doe', '@jim_smith'],
  },
  {
    type: 'public',
    name: '#programming',
    description: 'Discussion about programming languages and tools',
    subscribed: ['@john_doe', '@jim_smith'],
  },
  {
    type: 'publica',
    name: '#music',
    description: 'Discussion about music and artists',
    subscribed: ['@jane_doe', '@jim_smith'],
  },
  {
    type: 'public',
    name: '§movies',
    description: 'Discussion about movies and TV shows',
    subscribed: ['@john_doe', '@jane_doe'],
  },
  {
    type: 'public',
    name: 'books',
    description: 'Discussion about books and authors',
    subscribed: ['@jim_smith'],
  },
  {
    type: 'public',
    name: '#sports',
    description: 'Discussion about sports and athletes',
    subscribed: ['@john_doe', '@jane_doe', '@jim_smith'],
  },
  {
    type: 'public',
    name: '#food',
    description: 'Discussion about food and recipes',
    subscribed: ['@john_doe', '@jane_doe'],
  },
  {
    type: 'public',
    name: '#travel',
    description: 'Discussion about travel destinations and experiences',
    subscribed: ['@jane_doe', '@jim_smith', 'caca'],
  },
];

const AnonymousHome = () => {
  const navigate = useNavigate();
  const fetchPublicSquealsPage = useFetchSqueals('/squeals/');
  const fetchOfficialChannels = useFetchChannels('/channels/?official=true');

  // console.log(validate(channels[1], channelSchema));

  return (
    <>
      <header className="order-first my-3 flex w-full items-center justify-around">
        <section className="flex items-center space-x-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>
                  <HeaderLogo />
                </SheetTitle>
                <SheetDescription>
                  Lista dei canali pubblici di Squealer
                </SheetDescription>
              </SheetHeader>
              <ChannelList
                className="h-[83vh] overflow-auto"
                filter="official"
              />
            </SheetContent>
          </Sheet>
          <HeaderLogo responsive />
        </section>

        <div className="flex items-center space-x-2">
          <nav className="flex items-center space-x-2">
            <Button onClick={() => navigate('/login')}>Accedi</Button>
            <Button onClick={() => navigate('/signup')} variant="secondary">
              Iscriviti
            </Button>
          </nav>
          <ModeToggle />
        </div>
      </header>

      <div className="flex overflow-hidden">
        {/* Main content */}
        <main className="order-2 w-full overflow-auto md:w-4/6 lg:w-1/2">
          <MessageScroller />
        </main>

        {/* Left sidebar */}
        <aside className="order-1 hidden w-full overflow-auto md:block md:w-2/6 lg:w-1/4">
          <ChannelList filter="official" />
        </aside>

        {/* Right sidebar */}
        <aside className="order-3 hidden w-full overflow-hidden lg:block lg:w-1/4"></aside>
      </div>
      <footer className="order-last w-full p-4"></footer>
    </>
  );
};

export default AnonymousHome;
