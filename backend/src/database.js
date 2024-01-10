require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_USER_URL,
    user: process.env.DB_USER_NAME,
    database: process.env.DB_USER_DATABASE,
    password: process.env.DB_USER_PASSWORD,
});
if(pool) console.log('database started...')
module.exports = pool.promise();
