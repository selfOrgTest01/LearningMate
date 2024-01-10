const db = require('./../src/database');

const sql = {
  getEvents: `SELECT * FROM calendar WHERE user_id = ?`,
  insert: `INSERT INTO calendar (user_id, date, content) VALUES (?, ?, ?)`,
  update: `UPDATE calendar SET date = ?, content = ? WHERE calendar_id = ?`,
  delete: `DELETE FROM calendar WHERE calendar_id = ?`
};

const calendarDAO = {
  getEvents: async (id) => {
    try {
      const resp = await db.query(sql.getEvents, [id]);
      return { status: 200, message: '일정 조회 성공', data: resp };
    } catch (error) {
      console.error(error);
      return { status: 500, message: '일정 조회 실패', error: error.message };
    }
  },

  insertEvents: async (item) => {
    try {
      const resp = await db.query(sql.insert, [item.user_id, item.date, item.content]);
      const calendar_id = resp[0].insertId;
      // console.log(calendar_id);
      return { status: 200, message: '일정 생성 성공', data: calendar_id };
    } catch (error) {
      console.error(error);
      return { status: 500, message: '일정 생성 실패', error: error.message };
    }
  },

  updateEvents: async (item) => {
    try {
      const resp = await db.query(sql.update, [item.date, item.content, item.calendar_id, item.user_id]);
      if (resp.affectedRows === 0) {
        return { status: 404, message: '일정 수정 실패', error: 'No events updated' };
      }
      return { status: 200, message: '일정 수정 성공', data: resp };
    } catch (error) {
      console.error(error);
      return { status: 500, message: '일정 수정 실패', error: error.message };
    }
  },

  deleteEvents: async (id) => {
    try {
      const resp = await db.query(sql.delete, [id]);
      if (resp.affectedRows === 0) {
        return { status: 404, message: '일정 삭제 실패', error: 'No events deleted' };
      }
      return { status: 200, message: '일정 삭제 성공' };
    } catch (error) {
      console.error(error);
      return { status: 500, message: '일정 삭제 실패', error: error.message };
    }
  },
};

module.exports = calendarDAO;