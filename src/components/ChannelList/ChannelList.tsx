import { A, P } from '@/components/ui/typography';
import { useChannelsQuery } from '@/hooks/useChannels';
import { cn } from '@/utils';
import type { filter_t } from '@/utils/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

type Props = Readonly<{
  filter?: filter_t;
  className?: string;
}>;

export const ChannelList = ({ filter, className = '' }: Props) => {
  const { data, error } = useChannelsQuery(filter);

  const sharedClassName = 'm-1 rounded-sm border-2';

  if (data)
    return (
      <ul className={className}>
        {data.map((channel) => (
          <li key={channel.name} className={cn(sharedClassName, 'p-3')}>
            <P>
              <A href={`/channels/${channel.name}`}>{channel.name}</A>
            </P>
          </li>
        ))}
      </ul>
    );

  if (error)
    return (
      <Alert variant="destructive" className="container mt-14 w-11/12 max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Errore</AlertTitle>
        <AlertDescription>
          Non sono riuscito a caricare i tuoi canali!
          {error instanceof Error ? ` Errore: ${error.message}` : ''}
        </AlertDescription>
      </Alert>
    );

  return (
    <div className={cn(className)}>
      {Array.from({ length: 4 }, (_, i) => (
        <Skeleton key={i} className={cn(sharedClassName, 'h-14')} />
      ))}
    </div>
  );
};
