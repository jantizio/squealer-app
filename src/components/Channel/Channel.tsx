import HeaderLogo from '@/components/HeaderLogo';
import MessageScroller from '@/components/MessageScroller';
import ModeToggle from '@/components/ModeToggle';
import { Button } from '@/components/ui/button';
import { A, H1, Large, Lead, Muted } from '@/components/ui/typography';
import { useChannelQuery } from '@/hooks/useChannels';
import { useUser } from '@/lib/auth';
import { run } from '@/utils';
import { Settings } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const Channel = () => {
  const { channelName } = useParams<{ channelName: string }>();
  const navigate = useNavigate();
  const { data: authUser } = useUser();
  const isAuthenticated = !!authUser;

  //TODO: probabilmente il layout ora presente non va bene, lascio così per non fare modifiche inutili
  // ma servirebbe un layout a 3 colonne. Le due laterali fisse e quella centrare con la scrollbar centrale

  const {
    data: channel,
    isSuccess,
    isError,
    isLoading,
  } = useChannelQuery(channelName as string); // TODO: un po' sus

  const subscribeButton = run(() => {
    if (!authUser) return <></>;

    if (isSuccess && channel.subscribed.includes(authUser.username))
      return (
        <Button variant="secondary" size="sm">
          Iscritto
        </Button>
      );

    return <Button size="sm">Iscriviti</Button>;
  });

  return (
    <>
      <header className="order-first my-3 flex w-full items-center justify-around">
        <HeaderLogo />

        {isAuthenticated && (
          <Button
            onClick={() => navigate('/settings')}
            variant="outline"
            size="icon"
            className="mx-2"
          >
            <Settings className="h-icon-sm w-icon-sm" />
          </Button>
        )}

        {!isAuthenticated && (
          <div className="flex items-center space-x-2">
            <nav className="flex items-center space-x-2">
              <Button onClick={() => navigate('/login')}>Accedi</Button>
              <Button onClick={() => navigate('/signup')} variant="secondary">
                Iscriviti
              </Button>
            </nav>
            <ModeToggle />
          </div>
        )}
      </header>

      <div className="flex overflow-hidden">
        {/* Main content */}
        <main className="container order-2 w-full overflow-auto md:w-4/6 lg:w-1/2">
          {/* Error content */}
          {isError && (
            <>
              <H1 className="mt-32 text-center">Errore</H1>
              <section className="my-2 flex flex-wrap items-center justify-center md:space-x-5">
                <Large className="w-full text-center md:w-auto">
                  Il canale {channelName} non esiste
                </Large>
                <Button variant="outline" onClick={() => navigate('/')}>
                  Torna alla pagina principale
                </Button>
              </section>
            </>
          )}

          {/* Loading content */}
          {isLoading && <Lead className="mt-32">Caricamento...</Lead>}

          {/* Actual content */}
          {isSuccess && (
            <>
              <section className="flex flex-wrap items-center justify-between">
                <div className="w-full">
                  <A href="/channels" className="text-xs">
                    Scopri altri canali
                  </A>
                </div>
                <H1 className="mb-1 mr-1 break-all">{channel.name}</H1>
                {subscribeButton}
                <Muted className="mt-3 w-full">{channel.description}</Muted>
              </section>

              <MessageScroller channelName={channelName} />
            </>
          )}
        </main>

        {/* Left sidebar */}
        <aside className="order-1 hidden w-full overflow-auto md:block md:w-2/6 lg:w-1/4"></aside>

        {/* Right sidebar */}
        <aside className="order-3 hidden w-full overflow-hidden lg:block lg:w-1/4"></aside>
      </div>
      <footer className="order-last w-full p-4"></footer>
    </>
  );
};

export default Channel;
