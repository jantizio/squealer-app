import { Heading, HeadingLevel } from '@ariakit/react';
import { forwardRef } from 'react';
import { post_t } from '@/globals/types';
// import './Message.css';

type messageProps = {
  children: post_t;
};

const Message = forwardRef<HTMLDivElement, messageProps>(
  ({ children }, ref) => {
    const { title, body, userId } = children;

    return (
      <article
        className={
          'prose dark:prose-invert p-5 my-6 w-11/12 mx-auto border border-solid rounded border-neutral-500 shadow-md shadow-neutral-900 hover:shadow-xl'
        }
        ref={ref ? ref : undefined}
      >
        <HeadingLevel>
          <Heading>
            {title} - [{userId}]
          </Heading>
          <p>{body}</p>
        </HeadingLevel>
      </article>
    );
  }
);

export default Message;
