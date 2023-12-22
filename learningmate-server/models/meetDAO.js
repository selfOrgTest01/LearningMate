// 2023.12.22 수정 - 민경

const database = require('./../src/database'); 

const sql = {
  meetList: `SELECT m.meet_id, u.nickname, title, DATE_FORMAT(m.createdAt, '%Y-%m-%d') as createdAt
             FROM users u INNER JOIN meets m ON u.user_id = m.user_id
             ORDER BY m.meet_id DESC
             LIMIT ?, ?;`, // 미팅번호로 내림차순 (GROUP BY m.meet_id 해야하나?)
  meet:  `SELECT m.meet_id, u.nickname, title, content, start_date, end_date, max_num, onoff, image, category, approve, DATE_FORMAT(m.createdAt, '%Y-%m-%d') as createdAt
          FROM users u INNER JOIN meets m ON u.user_id = m.user_id
          WHERE m.meet_id = ?;`, // 특정 미팅 상세조회
  insert: `INSERT INTO meets(meet_id, title, content, start_date, end_date, max_num, onoff, image, category, approve, user_id) 
           VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  update: 'UPDATE meets SET title = ?, content = ?, start_date = ?, end_date = ?, max_num = ?, onoff = ?, image = ?, category = ?, approve = ? updatedAt = NOW() WHERE meet_id = ?',
  delete: 'DELETE FROM meets WHERE meet_id = ?',
  totalCount: 'SELECT COUNT(*) as cnt FROM meets' // 총 게시물 개수
};

const meetDAO = {
  meetList: async (item, callback) => { 
    const no = Number(item.no) - 1 || 0;
    const size = Number(item.size) || 10;

    let conn = null;
    try {
      conn = await database.getConnection();
      const [resp] = await conn.query(sql.meetList, [no * size, size]);
      const [cntResp] = await conn.query(sql.totalCount);
      const totalPage = Math.ceil(cntResp[0].cnt / size); 
      callback({
        status: 200, message: '모임 리스트 조회 성공',
        pageno: no + 1, pagesize: size, total: cntResp[0].cnt, totalPage, data: resp
      });
    } catch (error) {
      callback({ status: 500, message: '모임 리스트 조회 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  },

  meet: async (item, callback) => { 
    let conn = null;
    try {
      conn = await database.getConnection();
      conn.beginTransaction();
      const [resp] = await conn.query(sql.meet, [item.meet_id]);
      conn.commit();
      callback({ status: 200, message: '모임 상세 조회 성공', data: resp[0] });
    } catch (error) {
      conn.rollback();
      callback({ status: 500, message: '모임 상세 조회 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  },

  insert: async (item, callback) => {
    let conn = null;
    try {
      conn = await database.getConnection();
      conn.beginTransaction();
      const [resp] = await conn.query(sql.insert, [item.title, item.content, item.start_date, item.end_date, item.max_num, item.onoff, item.image, item.category, item.approve, item.user_id]);
      conn.commit();
      callback({ status: 200, message: '모임 생성 성공', data: resp });
    } catch (error) {
      conn.rollback();
      callback({ status: 500, message: '모임 생성 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  },

  update: async (item, callback) => {
    let conn = null;
    try {
      conn = await database.getConnection();
      conn.beginTransaction();
      const [resp] = await conn.query(sql.update, [item.title, item.content, item.start_date, item.end_date, item.max_num, item.onoff, item.image, item.category, item.approve, item.meet_id]);
      conn.commit();
      callback({ status: 200, message: '모임 수정 성공', data: resp });
    } catch (error) {
      conn.rollback();
      callback({ status: 500, message: '모임 수정 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  },

  delete: async (item, callback) => {
    console.log(item)
    let conn = null;
    try {
      conn = await database.getConnection();
      conn.beginTransaction();
      const [resp] = await conn.query(sql.delete, [Number(item.meet_id)]);
      conn.commit();
      callback({ status: 200, message: '모임 삭제 성공', data: resp });
    } catch (error) {
      conn.rollback();
      callback({ status: 500, message: '모임 삭제 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  },
};

module.exports = databaseOperations;
