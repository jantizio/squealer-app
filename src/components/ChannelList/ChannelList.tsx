import { Button } from '@/components/ui/button';
import { A, P } from '@/components/ui/typography';
import { channel_t } from '@/utils/types';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { X } from 'lucide-react';

type ChannelListProps = {
  fetchChannels: () => Promise<channel_t[]>;
  type: 'official' | 'subscribed' | 'direct' | 'public';
  removeButton?: boolean;
  className?: string;
};

const ChannelList = ({
  fetchChannels,
  type,
  removeButton = false,
  className = '',
}: ChannelListProps) => {
  const { data } = useQuery<channel_t[], AxiosError>(
    ['channels', type],
    fetchChannels,
  );
  const channelUnsub = () => {
    //TODO: api to unsub to a channel
    console.log('disiscritto dal canale');
  };

  return (
    <ul className={cn(className)}>
      {data?.map((channel) => (
        <li
          key={channel.name}
          className="m-1 flex items-center space-x-1 rounded-sm border-2 p-3"
        >
          <P>
            <A href={`/channels/${channel.name}`}>{channel.name}</A>
          </P>
          {removeButton && (
            <Button
              onClick={() => channelUnsub()}
              variant="outline"
              size="icon"
              className="border-destructive "
            >
              <X />
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ChannelList;
