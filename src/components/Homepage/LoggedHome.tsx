import { Form, FormInput, useFormStore, Button } from '@ariakit/react';
import MessageScroller from '@/components/MessageScroller';
import HeaderLogo from '@/components/HeaderLogo';
import { post_t } from '@/globals/types';
import { ReactComponent as Pencil } from '@/assets/pencil.svg';
import { ReactComponent as Settings } from '@/assets/settings.svg';
import { useNavigate } from 'react-router-dom';
import useAxios from '@/hooks/useAxios';

const LoggedHome = () => {
  const form = useFormStore({ defaultValues: { search: '' } });
  const navigate = useNavigate();
  const privateBackendApi = useAxios();

  const fetchPostPage = async (page: number) => {
    type postResp = Omit<post_t, 'username'> & { userId: number };

    const postArray: postResp[] = await privateBackendApi
      .get(`https://jsonplaceholder.typicode.com/posts?_page=${page}`)
      .then((response) => response.data);

    const outArray: post_t[] = [];

    for (const post of postArray) {
      let { username } = await privateBackendApi
        .get(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
        .then((response) => response.data);

      const { userId: _, ...result } = post;
      outArray.push({ username, ...result });
    }

    return outArray;
    //        ^?
  };

  return (
    <>
      <nav className="flex items-center  justify-around">
        <HeaderLogo />
        <Form store={form}>
          <FormInput
            name={form.names.search}
            type="search"
            placeholder="Cerca..."
          />
        </Form>
        <Button onClick={() => navigate('/settings')}>
          <Settings width={30} height={30} className="fill-amber-600" />
        </Button>
      </nav>
      <MessageScroller fetchPostPage={fetchPostPage} />
      <Button
        className="fixed bottom-0 right-0"
        onClick={() => navigate('/create')}
      >
        <Pencil width={60} height={60} className="fill-amber-500" />
      </Button>
    </>
  );
};

export default LoggedHome;
