// 사용자의 MeetId를 기반으로 채팅방 정보를 가져오고 가능한 경우 관련 세부 정보를 렌더링합니다.
import React, { useState, useEffect, useContext } from 'react';
// eslint-disable-next-line import/named
import { UserContext } from './UserContext'; // Import your user context

const ChatRoom = () => {
  const [chatRoomInfo, setChatRoomInfo] = useState(null);
  const { user } = useContext(UserContext); // Assume your user context has user information

  useEffect(() => {
    if (user && user.meetIds) {
      // Assuming user object has meetIds array
      const fetchChatRoomInfo = async () => {
        try {
          // Fetch data for the first meetId for simplicity (you might want to iterate through all meetIds)
          const meetId = user.meetIds[0];
          const response = await fetch(`/chat/chatRoom/${meetId}`);
          const data = await response.json();

          if (data.success) {
            setChatRoomInfo(data.data);
          } else {
            console.error(data.error);
          }
        } catch (error) {
          console.error('Error fetching chat room info:', error);
        }
      };

      fetchChatRoomInfo();
    }
  }, [user]);

  return (
    <div>
      <h1>Chat Room</h1>
      {chatRoomInfo && (
        <div>
          <h2>{chatRoomInfo.initialRoom[0].title}</h2>
          <ul>
            {chatRoomInfo.channelList.map((channel) => (
              <li key={channel.channel_id}>{channel.channel_description}</li>
            ))}
          </ul>
          {/* Render participantList or other data as needed */}
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
