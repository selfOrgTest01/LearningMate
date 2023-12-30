const database = require('../src/database');
const participantsDAO = require('../models/participantsDAO');


const sql = {
  initialRoom: `SELECT 
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

  channelList: `SELECT
                  channel_id,
                  description as channel_description
                FROM chat_room
                WHERE meet_id = ?`,
};

const chatRoomDAO = {
  getChatRoomInfo: async (meetId, callback) => {
    try {
      // 초기 채팅방 정보 조회
      const initialRoom = await db.all(sql.initialRoom, meetId);

      // 채널 목록 조회
      const channelList = await db.all(sql.channelList, meetId);

      // 참가자 목록 조회 (participantsDAO를 통해)
      participantsDAO.participantList(meetId, (response) => {
        if (response.status === 200) {
          const participantList = response.data;
          // 콜백 함수 호출 및 결과 반환
          callback({
            status: 200,
            message: '채팅방 정보 조회 성공',
            data: {
              initialRoom,
              channelList,
              participantList,
            },
          });
        } else {
          callback({
            status: 500,
            message: '참가자 목록 조회 실패',
            error: response.error,
          });
        }
      });
    } catch (error) {
      console.error(error);
      callback({ status: 500, message: '채팅방 정보 조회 실패', error: error.message });
    }
  },
};

module.exports = chatRoomDAO;