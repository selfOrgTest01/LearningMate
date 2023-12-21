const bcrypt = require('bcrypt');
const db = require('../src/database');
const sql = {
    sql_signUp: 'INSERT INTO users(email,phone_number, password_hash,nickname) VALUES (?,?,?,?)',
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
};

module.exports = usersDao;
