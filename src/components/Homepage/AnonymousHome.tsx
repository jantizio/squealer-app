import { useNavigate } from 'react-router-dom';
import { Button, Heading, HeadingLevel } from '@ariakit/react';
import MessageScroller from '@/components/MessageScroller';
import ChannelList from '@/components/ChannelList';
import HeaderLogo from '@/components/HeaderLogo';
import { channel_t, post_t } from '@/globals/types';
import { backendApi } from '@/globals/utility';

const fetchPostPage = async (page: number) => {
  type postResp = Omit<post_t, 'username'> & { userId: number };

  const postArray: postResp[] = await backendApi
    .get(`https://jsonplaceholder.typicode.com/posts?_page=${page}`)
    .then((response) => response.data);

  const outArray: post_t[] = [];

  for (const post of postArray) {
    let { username } = await backendApi
      .get(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
      .then((response) => response.data);

    const { userId: _, ...result } = post;
    outArray.push({ username, ...result });
  }

  return outArray;
  //        ^?
};

const fetchChannels = async () => {
  // const channelsApi: string = `/channels/?category=public`;

  const channelsApi: string = 'https://jsonplaceholder.typicode.com/albums';
  const res = await backendApi.get<channel_t[]>(channelsApi);
  return res.data;
};

function AnonymousHome() {
  const navigate = useNavigate();
  return (
    <HeadingLevel>
      <HeaderLogo />
      <Heading>Homepage non loggato</Heading>

      <div className="flex">
        <div></div>
        <MessageScroller fetchPostPage={fetchPostPage} />
        <ChannelList fetchChannels={fetchChannels} />
      </div>

      <div className="h-36"></div>
      {/* spacing needed for eventual bottom bar */}
      <div className="flex justify-center fixed bottom-0 w-full bg-neutral-900">
        <Button
          className="inline-block p-2 m-5 bg-blue-600 rounded"
          onClick={() => navigate('/login')}
        >
          Accedi
        </Button>
        <Button
          className="inline-block p-2 m-5 bg-blue-600 rounded"
          onClick={() => navigate('/signup')}
        >
          Iscriviti
        </Button>
      </div>
    </HeadingLevel>
  );
}

export default AnonymousHome;
