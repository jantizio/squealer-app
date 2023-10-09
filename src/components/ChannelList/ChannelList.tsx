import { Button } from '@/components/ui/button';
import { A, P } from '@/components/ui/typography';
import { useChannelsQuery } from '@/hooks/useChannels';
import { cn } from '@/utils';
import { filter_t } from '@/utils/types';
import { X } from 'lucide-react';

type ChannelListProps = {
  filter?: filter_t;
  removeButton?: boolean;
  className?: string;
};

const ChannelList = ({
  filter,
  removeButton = false,
  className = '',
}: ChannelListProps) => {
  const { data } = useChannelsQuery(filter);

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
