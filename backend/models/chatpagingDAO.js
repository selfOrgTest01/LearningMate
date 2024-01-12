const database = require('../src/database');

const sql = {
  paginatedChats: `
    SELECT 
      ch.id,
      ch.content,
      u.nickname as user_nickname,
      ch.sent_time as chat_sent_time
    FROM chat_history ch
    JOIN users u ON ch.sender_user_id = u.user_id
    WHERE ch.meet_id = ?
    ORDER BY ch.sent_time DESC
    LIMIT ? OFFSET ?`,
};

const chatpagingDAO = {
  getChatMessages: async (meetId, page = 1, perPage = 10) => {
    try {
      const offset = (page - 1) * perPage;
      const chats = await database.query(sql.paginatedChats, [meetId, perPage, offset]);

      const formattedChats = chats.map((chat) => ({
        id: chat.id,
        content: chat.content,
        user_nickname: chat.user_nickname,
        chat_sent_time: chat.chat_sent_time,
      }));

      return {
        success: true,
        message: '채팅 메시지 조회 성공',
        data: formattedChats,
        pageInfo: {
          currentPage: page,
          totalPages: Math.ceil(chats.length / perPage),
        },
        status: 200,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: '채팅 메시지 조회 실패',
        error: error.message,
        status: 500,
      };
    }
  },
  // 다른 DAO 메서드들 추가
};

module.exports = chatpagingDAO;
