import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatRoom from '../index';

function ParentComponent() {
  const navigate = useNavigate();
  const [meetId, setDynamicValue] = useState(null);

  const handleButtonClick = () => {
    // 원하는 meetId 값을 전달하도록 수정
    const newMeetId = 19; // 예시로 19로 설정했지만 원하는 meetId 값을 넣어주세요.
    setDynamicValue(newMeetId);

    // meetId를 가지고 ChatRoom 페이지로 동적으로 이동
    navigate(`/chat/chatRoom/${newMeetId}`);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>채팅방 참여하기</button>
      {meetId && <ChatRoom meetId={meetId} />}
    </div>
  );
}

export default ParentComponent;
