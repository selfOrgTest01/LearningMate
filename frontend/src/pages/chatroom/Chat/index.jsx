import React, { useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import regexifyString from 'regexify-string';
import gravatar from 'gravatar';
import dayjs from 'dayjs';
import ChatWrapper from './style';

const Chat = memo(({ data }) => {
  const sender = 'Sender' in data ? data.Sender : data.User;

  const result = useMemo(
    () =>
      regexifyString({
        pattern: /@\[(.+?)]\((\d+?)\)|\n/g,
        decorator(match, index) {
          const arr = match.match(/@\[(.+?)]\((\d+?)\)/);
          if (arr) {
            return (
              <Link key={match + index} to={`http://localhost:8000/users/list/${arr[2]}`}>
                @{arr[1]}
              </Link>
            );
          }
          return <br key={index} />;
        },
        input: data.chat_content,
      }),
    [data.chat_content],
  );

  return (
    <ChatWrapper>
      <div className='chat-img'>
        {sender.email && <img src={gravatar.url(sender.email, { s: '36px', d: 'retro' })} alt={sender.nickname} />}
      </div>
      <div className='chat-text'>
        <div className='chat-user'>
          <b>{sender.nickname}</b>
          <span>{dayjs(data.chat_sent_time).format('h:mm A')}</span>
        </div>
        <p>{result}</p>
      </div>
    </ChatWrapper>
  );
});

export default Chat;
