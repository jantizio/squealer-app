import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { channel_t } from '@/lib/types';
import { Button } from '@ariakit/react';

type ChannelListReqProps = {
  fetchChannels: () => Promise<channel_t[]>;
};
type ChannelListOptProps = {
  removeButton: boolean;
};

type ChannelListProps = ChannelListReqProps & ChannelListOptProps;

const defaultProps: ChannelListOptProps = {
  removeButton: false,
};

const ChannelList = ({
  fetchChannels,
  removeButton = false,
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
    <ul>
      {data?.map((channel) => (
        <li className="p-3 m-2 border rounded border-gray-200" key={channel.id}>
          <p>{channel.title}</p>
          {removeButton && (
            <Button
              onClick={() => channelUnsub()}
              className="border border-red-900 rounded p-1"
            >
              R
            </Button>
          )}
          {/*Sostituire con un'icona*/}
        </li>
      ))}
    </ul>
  );
};

ChannelList.defaultProps = defaultProps;

export default ChannelList;
