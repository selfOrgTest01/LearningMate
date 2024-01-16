const db = require('../src/database');

const sql = {
  courseList: `SELECT c.course_id, u.nickname, u.profile_name, title, attach_image_path, view_cnt, DATE_FORMAT(c.createdAt, '%Y-%m-%d %H:%i') as createdAt
               FROM users u INNER JOIN courses c ON u.user_id = c.user_id
               ORDER BY c.course_id DESC;`, // 강의번호로 내림차순 (GROUP BY c.course_id 해야하나?)

  mainCourseList: `SELECT c.course_id, u.nickname, title, attach_image_path, view_cnt, DATE_FORMAT(c.createdAt, '%Y-%m-%d %H:%i') as createdAt
                FROM users u INNER JOIN courses c ON u.user_id = c.user_id
                ORDER BY c.course_id DESC
                LIMIT 9;`,

  course: `SELECT c.user_id, c.course_id, u.nickname, u.profile_name, title, content, category, attach_file_path, attach_file_name, attach_image_path, view_cnt, DATE_FORMAT(c.createdAt, '%Y-%m-%d %H:%i') as createdAt
            FROM users u INNER JOIN courses c ON u.user_id = c.user_id
            WHERE c.course_id = ?;`, // 특정 강의 상세조회

  insert: `INSERT INTO courses(title, content, category, user_id, attach_file_path, attach_file_name, attach_image_path) 
             VALUES(?, ?, ?, ?, ?, ?, ?)`,

  update:
    'UPDATE courses SET title = ?, content = ?, category = ?, attach_file_path = ?, attach_file_name = ?, attach_image_path = ? WHERE course_id = ?',

  delete: 'DELETE FROM courses WHERE course_id = ?',

  search: `SELECT c.course_id, u.nickname, title, attach_image_path, view_cnt, DATE_FORMAT(c.createdAt, '%Y-%m-%d %H:%i') as createdAt
           FROM users u INNER JOIN courses c ON u.user_id = c.user_id
           WHERE title LIKE CONCAT('%', ?, '%') OR content LIKE CONCAT('%', ?, '%');`,

  increase_view: `UPDATE courses SET view_cnt = view_cnt + 1 WHERE course_id = ?`,
  myCourseList: 'SELECT * FROM courses WHERE user_id = ?',
};

const coursesDAO = {
  courseList: async (callback) => {
    try {
      const [resdata] = await db.query(sql.courseList);
      callback({
        status: 200,
        message: '강의 리스트 조회 성공',
        data: resdata,
      });
    } catch (error) {
      console.error(error);
      callback({ status: 500, message: '강의 리스트 조회 실패', error: error });
    }
  },

  mainCourseList: async (callback) => {
    try {
      const [resdata] = await db.query(sql.mainCourseList);
      callback({
        status: 200,
        message: '강의 리스트 조회 성공',
        data: resdata,
      });
    } catch (error) {
      console.error(error);
      callback({ status: 500, message: '강의 리스트 조회 실패', error: error });
    }
  },

  course: async (id, user_id, callback) => {
    try {
      const resp = await db.query(sql.course, [id]);
      if (resp[0].length === 0) {
        // course_id에 해당하는 강의가 없다면
        callback({ status: 500, message: '강의 상세 조회 실패', error: error });
      } else {
        // 작성자가 아니면 조회수 1증가
        if (Number(user_id) !== resp[0][0].user_id) {
          await db.query(sql.increase_view, [id]);
          console.log('조회수증가');
        }
        callback({
          status: 200,
          message: '강의 상세 조회 성공',
          data: resp[0],
        });
      }
    } catch (error) {
      console.error(error);
      callback({ status: 500, message: '강의 상세 조회 실패', error: error });
    }
  },

  insert: async (item, videoPath, videoName, imagePath, callback) => {
    try {
      const [resp] = await db.query(sql.insert, [
        item.title,
        item.content,
        item.category,
        item.user_id,
        videoPath,
        videoName,
        imagePath,
      ]);
      //resp.insertId로 insert된 데이터의 course_id를 추출가능
      callback({ status: 200, message: '강의 생성 성공', data: resp.insertId });
    } catch (error) {
      console.error(error);
      callback({ status: 500, message: '강의 생성 실패', error: error });
    }
  },

  update: async (item, videoPath, videoName, imagePath, callback) => {
    console.log(item.content);
    try {
      const resp = await db.query(sql.update, [
        item.title,
        item.content,
        item.category,
        videoPath,
        videoName,
        imagePath,
        item.course_id,
      ]);
      if (resp.affectedRows === 0) {
        callback({ status: 500, message: '강의 수정 실패', error: error });
      } else {
        callback({ status: 200, message: '강의 수정 성공', data: resp });
      }
    } catch (error) {
      console.error(error);
      callback({ status: 500, message: '강의 수정 실패', error: error });
    }
  },

  delete: async (id, callback) => {
    try {
      const resp = await db.query(sql.delete, [id]);
      if (resp.affectedRows === 0) {
        //  해당 조건에 맞는 행이 존재하지 않는다면 affectedRows가 0
        callback({ status: 500, message: '강의 삭제 실패', error: error });
      } else {
        callback({ status: 200, message: '강의 삭제 성공' });
      }
    } catch (error) {
      console.error(error);
      callback({ status: 500, message: '강의 삭제 실패', error: error });
    }
  },

  search: async (term, callback) => {
    try {
      const [resp] = await db.query(sql.search, [term, term]);
      callback({ status: 200, message: '검색성공', data: resp });
    } catch (error) {
      console.log(error);
      callback({ status: 500, message: '검색실패', error: error });
    }
  },

  myCourseList: async (user_id) => {
    try {
      const [rows, fields] = await db.query(sql.myCourseList, [user_id]);
      return { status: 200, data: rows };
    } catch (error) {
      console.error('내 강의 불러오기 중 에러 발생:', error);
      return { status: 500, message: '내 강의 불러오기 실패', error: error.message };
    }
  },
};

module.exports = coursesDAO;
