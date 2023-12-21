const express = require('express');
const router = express.Router();
const db = require('../src/database');
const usersDao = require('../models/usersDAO');
//회원가입, 로그인, 마이페이지는 여기에 구현하면 됩니다.
router.post('/login', async (req, res) => {});
router.post('/signup', async (req, res) => {
    const userData = req.body;
    try {
        await usersDao.signUp(userData, (resp) => {
            res.send(resp);
        });
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;
