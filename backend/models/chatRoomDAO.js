const database = require('../src/database');
const participantsDAO = require('./participantsDAO');

const sql = {
  initialRoom: `
    SELECT 
    m.title, 
    cr.channel_id, 
    cr.description AS channel_description, 
    u.nickname AS user_nickname,
    u.profile_name,  
    ch.content AS chat_content, 
    ch.sender_user_id AS chat_sender_user_id, 
    ch.sent_time AS chat_sent_time
  FROM chat_room cr
  JOIN meet_participants mp ON cr.meet_id = mp.meet_id
  JOIN users u ON mp.user_id = u.user_id
  JOIN meets m ON cr.meet_id = m.meet_id
  LEFT JOIN chat_history ch ON cr.channel_id = ch.channel_id
  WHERE cr.description = '공지사항' AND mp.meet_id = ? AND mp.status = 1
  ORDER BY ch.sent_time ASC;`,

  channelChatRoom: `
  SELECT *
  FROM chat_room cr
    JOIN chat_history ch on cr.channel_id = ch.channel_id
    JOIN users u on u.user_id = ch.sender_user_id
  WHERE ch.channel_id = ?;
  `,

  channelList: `
    SELECT
      channel_id,
      description as channel_description
    FROM chat_room
    WHERE meet_id = ?`,

  sendMessage: `
    INSERT INTO chat_history (channel_id, content, sender_user_id, sent_time)
    VALUES (?, ?, ?, NOW())`,
};

const chatRoomDAO = {
  getChatRoomInfo: async function (meetId, fn_callback) {
    try {
      const [resdata] = await database.query(sql.initialRoom, meetId);
      const flattenedData = resdata.flat();
      const formattedChatRoomInfo = {
        initialRoom: flattenedData,
      };
      fn_callback({
        status: 200,
        message: '채팅방 정보 조회 성공',
        data: formattedChatRoomInfo,
      });
    } catch (err) {
      console.error(err);
      fn_callback({status: 500, message: '채팅방 정보 조회 실패'});
    }
  },

  getChannelChatRoomData: async function (channelId, fn_callback) {
    try {
      const [channelData] = await database.query(sql.channelChatRoom, [channelId]);

      const formattedChannelChatRoom = {
        channelData: channelData.map((channel) => ({
          channel_description: channel.description,
          senderNickname: channel.nickname,
          content: channel.content,
          sentTime: channel.sent_time,
          profile: channel.profile_name,
        })),
      };

      fn_callback({
        status: 200,
        message: '채널 정보 조회 성공',
        data: formattedChannelChatRoom,
      });
    } catch (error) {
      console.error(error);
      fn_callback({status: 500, message: '채널 정보 조회 실패', error: error.message});
    }
  },

  getChannelList: async function (meetId, fn_callback) {
    try {
      const [channelList] = await database.query(sql.channelList, meetId);

      const formattedChannelList = {
        channelList: channelList.map((channel) => ({
          channel_id: channel.channel_id,
          channel_description: channel.channel_description,
        })),
      };

      fn_callback({
        status: 200,
        message: '채널 목록 조회 성공',
        data: formattedChannelList,
      });
    } catch (error) {
      console.error(error);
      fn_callback({status: 500, message: '채널 목록 조회 실패', error: error.message});
    }
  },

  sendMessage: async function (meetId, channelId, content, senderUserId, fn_callback) {
    try {
      // channelId와 meetId를 사용하여 채팅 메시지를 데이터베이스에 저장
      await database.query(sql.sendMessage, [channelId, content, senderUserId, meetId]);

      fn_callback({
        status: 200,
        message: '채팅 메시지 전송 성공',
      });
    } catch (error) {
      console.error(error);
      fn_callback({
        status: 500,
        message: '채팅 메시지 전송 실패',
        error: error.message,
      });
    }
  },
};

module.exports = chatRoomDAO;
