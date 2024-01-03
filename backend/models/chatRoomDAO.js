const database = require('../src/database');
const participantsDAO = require('./participantsDAO');

const sql = {
  initialRoom: `
    SELECT 
      m.title, 
      cr.channel_id, 
      cr.description as channel_description, 
      u.nickname as user_nickname, 
      ch.content as chat_content, 
      ch.sender_user_id as chat_sender_user_id, 
      ch.sent_time as chat_sent_time
    FROM chat_room cr
    JOIN meet_participants mp ON cr.meet_id = mp.meet_id
    JOIN users u ON mp.user_id = u.user_id
    JOIN meets m ON cr.meet_id = m.meet_id
    LEFT JOIN chat_history ch ON cr.channel_id = ch.channel_id
    WHERE cr.description = '공지사항' AND mp.meet_id = ? AND mp.status = 1
    ORDER BY ch.sent_time ASC`,

  channelList: `
    SELECT
      channel_id,
      description as channel_description
    FROM chat_room
    WHERE meet_id = ?`,
};


const chatRoomDAO = {
  getChatRoomInfo: async (meetId, callback) => {
    try {
      const initialRoom = await database.query(sql.initialRoom, meetId);
      const channelList = await database.query(sql.channelList, meetId);
      
      // Use participantsDAO.getParticipants directly instead of participantList
      const participantList = await participantsDAO.getParticipants(meetId);

      // Flatten nested arrays
      const flattenedInitialRoom = initialRoom.flat();
      const flattenedChannelList = channelList.flat();

      const formattedChatRoomInfo = {
        initialRoom: flattenedInitialRoom,
        channelList: flattenedChannelList,
        participantList,
      };

      // Check if callback is a function before calling it
      if (typeof callback === 'function') {
        callback({
          status: 200,
          message: '채팅방 정보 조회 성공',
          data: formattedChatRoomInfo,
        });
      } else {
        console.error('Callback is not a function:', callback);
      }
    } catch (error) {
      console.error(error);
      // Pass error to the callback if it is a function
      if (typeof callback === 'function') {
        callback({ status: 500, message: '채팅방 정보 조회 실패', error: error.message });
      } else {
        console.error('Callback is not a function:', callback);
      }
    }
  },
};

module.exports = chatRoomDAO;