import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { channel_t } from '@/globals/types';

const ChannelList = () => {
  const { data } = useQuery<channel_t[], AxiosError>(['channels'], async () => {
    // const channelsApi: string = `${
    //   import.meta.env.VITE_API_URL
    // }/squeals/?category=public`;

    const channelsApi: string = 'https://jsonplaceholder.typicode.com/albums';
    const res = await axios.get<channel_t[]>(channelsApi);
    return res.data;
  });

  return (
    <ul>
      {data?.map((channel) => (
        <li className="p-3 m-2 border rounded border-gray-200" key={channel.id}>
          {channel.title}
        </li>
      ))}
    </ul>
  );
};

export default ChannelList;
