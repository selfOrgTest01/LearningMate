const express = require('express');
const router = express.Router();
const db = require('../src/database');
const usersController = require('../controllers/users');
//회원가입, 로그인, 마이페이지는 여기에 구현하면 됩니다.
router.post('/login', async (req, res) => {});
router.post('/signup', usersController.signupUser);
module.exports = router;
