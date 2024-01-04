/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Chat({ dynamicValue }) {
  const [chatRoomInfo, setChatRoomInfo] = useState(null);

  useEffect(() => {
    const fetchChatRoomInfo = async () => {
      try {
        if (dynamicValue === undefined) {
          console.error('dynamicValue is undefined.');
          return;
        }

        const response = await axios.get(`http://localhost:8000/chat/chatRoom/${dynamicValue}`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setChatRoomInfo(response.data.data);
        } else {
          console.error('채팅방 정보 조회 실패:', response.data.message);
        }
      } catch (error) {
        console.error('네트워크 오류 등의 실패:', error);
      }
    };

    if (dynamicValue !== undefined) {
      fetchChatRoomInfo();
    }
  }, [dynamicValue]);

  if (!chatRoomInfo) {
    return <p>Loading...</p>;
  }

  // Extracting unique values for Title, User Nickname, and Chat Content
  const uniqueTitles = [...new Set(chatRoomInfo.initialRoom.map((room) => room.title))];

  // Filter messages for the channel with the description "공지사항"
  const filteredMessages = chatRoomInfo.initialRoom.filter((room) => room.channel_description === '공지사항');

  return (
    <div>
      {/* Your workspace layout or styling here */}
      <h1>Chat Room Info</h1>
      {uniqueTitles.map((title, index) => (
        <div key={index}>
          <p>Title: {title}</p>
          {/* Displaying details for the latest message with the specific title */}
          {filteredMessages
            .filter((room) => room.title === title)
            .map((room, idx) => (
              <div key={idx}>
                <p>Channel Description: {room.channel_description}</p>
                <p>User Nickname: {room.user_nickname}</p>
                <p>Chat Content: {room.chat_content}</p>
                <p>Chat Sender User ID: {room.chat_sender_user_id}</p>
                <p>Chat Sent Time: {room.chat_sent_time}</p>
              </div>
            ))}
        </div>
      ))}
      <p>Channel List: {chatRoomInfo.channelList.map((channel) => channel.channel_description).join(', ')}</p>
      <p>Participant List: {chatRoomInfo.participantList.join(', ')}</p>
    </div>
  );
}

export default Chat;
