const bcrypt = require('bcrypt');
const db = require('../src/database');
const sql = {
    sql_signUp: 'INSERT INTO users(email,phone_number, password_hash,nickname) VALUES (?,?,?,?)', //회원가입
    sql_userList: 'SELECT user_id,email,phone_number,nickname,signup_date FROM users', //유저정보조회
    sql_userDelete: 'DELETE FROM users WHERE user_id=?', //유저정보삭제
    sql_check: 'SELECT user_id,email,phone_number,nickname FROM users', //중복체크
};

const usersDao = {
    signUp: async function (userData, fn_callback) {
        try {
            const { email, phone_number, password, nickname } = userData;
            const passwordHash = await bcrypt.hash(password, 12);
            const [resdata] = await db.query(sql.sql_signUp, [
                email,
                phone_number,
                passwordHash,
                nickname,
            ]);
            console.log(resdata);
            fn_callback({ status: 200, message: '등록됨' });
        } catch (err) {
            console.log(err);
            fn_callback({ status: 500, message: '등록실패' });
        }
    },
    userList: async function (fn_callback) {
        try {
            const [resdata] = await db.query(sql.sql_userList);
            console.log(resdata);
            fn_callback({ status: 200, message: 'DB읽어오기 성공', data: resdata });
        } catch (err) {
            console.log(err);
            fn_callback({ status: 500, message: 'DB읽어오기 실패' });
        }
    },
    check: async function (fn_callback) {
        try {
            const [resdata] = await db.query(sql.sql_check);
            fn_callback({ status: 200, message: 'DB읽어오기 성공', data: resdata });
        } catch (err) {
            console.log(err);
            fn_callback({ status: 500, message: 'DB읽어오기 실패' });
        }
    },
    delete: async function (id, fn_callback) {
        try {
            const [resdata] = await db.query(sql.sql_userDelete, [Number(id)]);
            fn_callback({ status: 200, message: '삭제 성공' });
        } catch (err) {
            console.log(err);
            fn_callback({ status: 200, message: '삭제 실패' });
        }
    },
};

module.exports = usersDao;
