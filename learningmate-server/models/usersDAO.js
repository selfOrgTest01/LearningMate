const bcrypt = require('bcrypt');
const db = require('../src/database');

const sql = {
    sql_login: 'SELECT user_id,email,password_hash FROM users WHERE email = ?',
    sql_signUp: 'INSERT INTO users(email,phone_number, password_hash,nickname) VALUES (?,?,?,?)', //회원가입
    sql_userList: 'SELECT user_id,email,phone_number,nickname,signup_date FROM users', //유저정보조회
    sql_userDelete: 'DELETE FROM users WHERE user_id=?', //유저정보삭제
    sql_check: 'SELECT user_id,email,phone_number,nickname FROM users', //중복체크
};

const usersDao = {
    login: async function (userData, fn_callback) {
        try {
            const { email, password } = userData;
            const [resdata] = await db.query(sql.sql_login, [email]);
            //아이디 입력이 틀렸거나 아이디가 존재하지 않는경우
            if (resdata.length === 0) {
                fn_callback({
                    status: 500,
                    message: '존재하지 않는 아이디거나 잘못된 아이디입니다.',
                    errCode: 'idErr',
                });
            } else {
                // console.log(resdata[0].user_id);
                const password_hash = resdata[0].password_hash;
                //bcrypt.compare 함수는 두 개의 인자를 받아오는데, 첫 번째 인자는 사용자가 입력한 패스워드이고, 두 번째 인자는 데이터베이스에서 가져온 해시된 패스워드입니다.
                //함수의 콜백에서 result 값이 true이면 비밀번호가 일치하고, false이면 비밀번호가 일치하지 않습니다.
                bcrypt.compare(password, password_hash, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if (result) {
                            console.log('비밀번호 일치');
                            fn_callback({
                                status: 200,
                                message: '로그인성공',
                                sessionData: resdata[0].user_id,
                            });
                        } else {
                            console.log('비밀번호 불일치');
                            fn_callback({ status: 500, message: '로그인실패', errCode: 'pwdErr' });
                        }
                    }
                });
            }
        } catch (err) {
            console.log(err);
            fn_callback({ status: 500, message: '로그인 통신실패' });
        }
    },
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
            // console.log(resdata);
            fn_callback({ status: 200, message: '등록됨' });
        } catch (err) {
            console.log(err);
            fn_callback({ status: 500, message: '등록실패' });
        }
    },
    userList: async function (fn_callback) {
        try {
            const [resdata] = await db.query(sql.sql_userList);
            // console.log(resdata);
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
