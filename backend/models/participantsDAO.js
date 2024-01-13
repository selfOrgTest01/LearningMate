const db = require('./../src/database');

const sql = {
  participantCount: `SELECT COUNT(*) AS participant_count
                    FROM meet_participants p
                    WHERE p.meet_id = ? AND p.status = 1`, // status가 1인 참가자 수
  participantList: `SELECT p.participant_id, m.meet_id, u.nickname, p.status, m.manager
                     FROM meet_participants p INNER JOIN users u ON p.user_id = u.user_id INNER JOIN meets m ON p.meet_id = m.meet_id
                     WHERE p.meet_id = ?`, // 참가자 목록
  insert: 'INSERT INTO meet_participants(meet_id, user_id) VALUES(?, ?)',
  update: 'UPDATE meet_participants SET status = 1 WHERE participant_id = ?', // 참가 허락되면 status(권한)이 1
  delete: 'DELETE FROM meet_participants WHERE meet_id = ? AND participant_id = ?', // 삭제를 하려는 사람의 meet_id, participant_id를 가져오기
  // -> 프론트에서 manager가 1인 사람에게만 삭제 버튼이 보여지게 만들기
  // -> 세션사용 !! 백에서 !
  getMeetInfo:
    'SELECT mp.user_id AS meet_creator_id, mp.manager ' +
    'FROM meet_participants mp ' +
    'WHERE mp.meet_id = ?',
};



const participantsDAO = {
  participantList: async (meet_id, callback) => {
    // 데이터 들어갔는지 확인 완료!
    try {
      const resp = await db.query(sql.participantList, [meet_id]);
      if (resp.length === 0) {
        // meet_id에 해당하는 참가자가 없다면
        callback({status: 500, message: '참가자 전체 조회 실패', error: error});
      } else {
        callback({status: 200, message: '참가자 전체 조회 성공', data: resp[0]});
      }
    } catch (error) {
      console.error(error);
      callback({status: 500, message: '참가자 전체 조회 실패', error: error});
    }
  },

  insert: async (item, callback) => {
    // 데이터 들어갔는지 확인 완료!
    try {
      const resp = await db.query(sql.insert, [item.meet_id, item.user_id, item.status]);
      callback({status: 200, message: '참가자 추가 성공', data: resp});
    } catch (error) {
      console.error(error);
      callback({status: 500, message: '참가자 추가 실패', error: error});
    }
  },

  update: async (item, callback) => {
    // 데이터 들어갔는지 확인 완료!
    try {
      const resp = await db.query(sql.update, [item.participant_id]);
      if (resp.affectedRows === 0) {
        callback({status: 500, message: '참가자 상태 수정 실패', error: error});
      } else {
        callback({status: 200, message: '참가자 상태 수정 성공', data: resp});
      }
    } catch (error) {
      console.error(error);
      callback({status: 500, message: '참가자 상태 수정 실패', error: error});
    }
  },

  delete: async (meet_id, participant_id, callback) => {
    // 테스트 해봐야함
    try {
      const user_id = req.session.user_id;

      const meetInfoResult = await db.query(sql.getMeetInfo, [meet_id]);

      if (meetInfoResult.length === 0) {
        callback({
          status: 500,
          message: '참가자 삭제 실패',
          error: '모임 정보를 찾을 수 없습니다.',
        });
        return;
      }

      const meetInfo = meetInfoResult[0];

      if (meetInfo.meet_creator_id === user_id && meetInfo.manager === 1) {
        const resp = await db.query(sql.delete, [participant_id, meet_id]);

        if (resp.affectedRows === 0) {
          callback({status: 500, message: '참가자 삭제 실패', error: '삭제할 row가 없습니다.'});
        } else {
          callback({status: 200, message: '참가자 삭제 성공'});
        }
      } else {
        callback({status: 403, message: '권한이 없습니다.', error: '매니저만 삭제할 수 있습니다.'});
      }
    } catch (error) {
      console.error(error);
      callback({status: 500, message: '참가자 삭제 실패', error: error});
    }
  },

  // meet_participants 테이블에서 manager가 1이거나 status가 1인 user를 선택하는 함수 (게시판 이동용)
  getParticipantCount: async (req, res) => {
    const {meet_id} = req.params;

    try {
      await participantsDAO.getParticipantCount(meet_id, (error, participantCount) => {
        if (error) {
          console.error('Error getting participant count:', error);
          res.status(500).send({error: 'Internal Server Error'});
        } else {
          res.send({participantCount});
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({error: 'Internal Server Error'});
    }
  },
  // 게시판으로 이동하는 함수
  moveToChatRoom: async () => {
    try {
      const resp = await db.query(sql.moveToChatRoom, [user_id, meet_id]);
      if (resp.affectedRows === 0) {
        const error = new Error('사용자를 채팅방으로 이동할 수 없습니다.');
        error.statusCode = 500;
        throw error;
      }

      const chatRoomInfo = await chatRoomDAO.getChatRoomInfo(meet_id);
      callback({ status: 200, message: '채팅방으로 이동 성공', data: chatRoomInfo });
    } catch (error) {
      console.error(error);
      const status = error.statusCode || 500;
      const message = error.message || '채팅방으로 이동 실패';
      callback({ status, message, error: error.toString() });
    }
  },
};

module.exports = participantsDAO;