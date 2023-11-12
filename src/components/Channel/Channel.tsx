import { AnonymousHeader } from '@/components/Header/AnonymousHeader';
import { LoggedHeader } from '@/components/Header/LoggedHeader';
import { MessageScroller } from '@/components/MessageScroller';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { A, H1, Large, Muted } from '@/components/ui/typography';
import { useChannelQuery } from '@/hooks/useChannels';
import { useUser } from '@/lib/auth';
import { run } from '@/utils';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export const Channel = () => {
  const { channelName } = useParams();
  if (!channelName) throw new Error('Channel name is required');

  const { data: authUser } = useUser();
  const isAuthenticated = !!authUser;
  const [exists, setExists] = useState(true);

  const { data: channel, error } = useChannelQuery(channelName, exists);

  useEffect(() => {
    if (
      error &&
      error instanceof AxiosError &&
      error.response?.status === 404
    ) {
      setExists(false);
    }
  }, [error]);

  const subscribeButton = run(() => {
    if (!isAuthenticated) return <></>;

    if (channel?.subscribed)
      return (
        <Button variant="secondary" size="sm">
          Iscritto
        </Button>
      );

    return <Button size="sm">Iscriviti</Button>;
  });

  return (
    <>
      {isAuthenticated ? <LoggedHeader /> : <AnonymousHeader />}

      <div className="flex overflow-hidden">
        {/* Main content */}
        <main className="container order-2 w-full overflow-auto md:w-4/6 lg:w-1/2">
          {run(() => {
            /* Actual content */
            if (channel)
              return (
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
              );

            /* Error content */
            if (error) {
              return (
                <>
                  <H1 className="mt-32 text-center">Errore</H1>
                  <section className="my-2 flex flex-wrap items-center justify-center md:space-x-5">
                    <Large className="w-full text-center md:w-auto">
                      {error instanceof AxiosError &&
                        error.response?.status === 404 &&
                        `Il canale ${channelName} non esiste`}
                      {!(error instanceof AxiosError) &&
                        error instanceof Error && (
                          <>
                            Riprova più tardi
                            <Muted>{error.message}</Muted>
                          </>
                        )}
                    </Large>
                    <Button variant="outline" asChild>
                      <Link to="/channels">Scopri altri canali</Link>
                    </Button>
                  </section>
                </>
              );
            }
            /* Loading content */
            return (
              <>
                <section className="flex flex-wrap items-center justify-between">
                  <div className="w-full">
                    <Skeleton className="mb-1 h-[12px] w-[90px]" />
                  </div>
                  <Skeleton className="h-[40px] w-[300px]" />
                  <Skeleton className="h-[36px] w-[66px]" />
                  <Skeleton className="mt-3 h-[20px] w-full" />
                </section>
                <div className="container mt-14">
                  {Array.from({ length: 4 }, (_, i) => (
                    <Skeleton
                      key={i}
                      className="mx-auto mb-6 h-52 max-w-prose rounded p-5"
                    />
                  ))}
                </div>
              </>
            );
          })}
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
