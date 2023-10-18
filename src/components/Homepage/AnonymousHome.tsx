import { ChannelList } from '@/components/ChannelList';
import { AnonymousHeader } from '@/components/Header/AnonymousHeader';
import { MessageScroller } from '@/components/MessageScroller';

export const AnonymousHome = () => {
  return (
    <>
      <AnonymousHeader isHome />

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
