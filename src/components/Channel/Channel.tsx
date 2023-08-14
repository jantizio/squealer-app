import { useParams } from 'react-router-dom';

const Channel = () => {
  let { channelName } = useParams<{ channelName: string }>();
  return <div>Canale {channelName}</div>;
};

export default Channel;
