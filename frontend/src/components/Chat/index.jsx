// 채팅 메세지를 표시하고 멘션된 사용자를 링크로 변환
import React, { useMemo, memo } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import regexifyString from 'regexify-string';
import gravatar from 'gravatar';
import dayjs from 'dayjs';
import ChatWrapper from './style';

const Chat = memo(({ data }) => {
  // data 객체는 채팅 메시지와 관련된 데이터를 포함하고 있다.
  const { meetId } = useParams();
  const sender = 'Sender' in data ? data.Sender : data.User;

  const result = useMemo(
    // 채팅 메시지에서 멘션된 사용자를 링크로 변환
    () =>
      regexifyString({
        pattern: /@\[(.+?)]\((\d+?)\)|\n/g,
        decorator(match, index) {
          // 찾은 패턴이 멘션 형식(@[something](someUserId))이면, 해당 유저의 프로필로 연결되는 Link 컴포넌트를 반환, 그렇지 않으면 개행 문자(<br>)를 반환
          const arr = match.match(/@\[(.+?)]\((\d+?)\)/);
          if (arr) {
            return (
              <Link key={match + index} to={`http://localhost:8000/users/userinfo/dm/${arr[2]}`}>
                @{arr[1]}
              </Link>
            );
          }
          return <br key={index} />;
        },
        input: data.chat_content, // 변경된 부분
      }),
    [data.chat_content],
  );

  return (
    <ChatWrapper>
      <div className='chat-img'>
        <img src={gravatar.url(sender.email, { s: '36px', d: 'retro' })} alt={sender.nickname} />
      </div>
      <div className='chat-text'>
        <div className='chat-user'>
          <b>{sender.nickname}</b>
          <span>{dayjs(data.chat_sent_time).format('h:mm A')}</span> {/* 변경된 부분 */}
        </div>
        <p>{result}</p>
      </div>
    </ChatWrapper>
  );
});

export default Chat;
