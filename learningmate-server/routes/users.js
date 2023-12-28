const express = require('express');
const router = express.Router();
const db = require('../src/database');
const usersController = require('../controllers/users');
//회원가입, 로그인, 마이페이지는 여기에 구현하면 됩니다.
//로그인
router.post('/login', usersController.login);
//회원가입
router.post('/signup', usersController.signupUser);
//로그아웃
router.get('/logout', usersController.logout);
//사진업로드 테스트
router.post('/image/:id', usersController.image);
//마이리스트
router.get('/userinfo', usersController.userInfo);
//회원리스트
router.get('/list', usersController.userList);
//중복검사용 회원정보 검색
router.get('/check', usersController.check);
//회원삭제
router.delete('/delete/:id', usersController.deleteUser);

module.exports = router;
