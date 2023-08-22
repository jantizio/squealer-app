import { Button } from '@/components/ui/button';
import { A, P } from '@/components/ui/typography';
import { channel_t } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { X } from 'lucide-react';

type ChannelListReqProps = {
  fetchChannels: () => Promise<channel_t[]>;
};
type ChannelListOptProps = {
  removeButton: boolean;
  className: string;
};

type ChannelListProps = ChannelListReqProps & ChannelListOptProps;

const ChannelList = ({
  fetchChannels,
  removeButton,
  className,
}: ChannelListProps) => {
  const { data } = useQuery<channel_t[], AxiosError>(
    ['channels'],
    fetchChannels
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
          className="flex items-center p-3 m-1 space-x-1 border-2 rounded-sm"
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

const defaultProps: ChannelListOptProps = {
  removeButton: false,
  className: '',
};
ChannelList.defaultProps = defaultProps;

export default ChannelList;
