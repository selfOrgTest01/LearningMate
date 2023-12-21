const bcrypt = require('bcrypt');
const db = require('../src/database');
const sql = {
    sql_signUp: 'INSERT INTO users(email,password_hash,nickname) VALUES (?,?,?)',
};

const usersDao = {
    signUp: async function (userData, fn_callback) {
        try {
            const { email, password, nickname } = userData;
            const passwordHash = await bcrypt.hash(password, 12);
        } catch (err) {
            console.log(err);
        }
    },
};

export default usersDao;
