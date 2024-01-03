//'/chatRoom/:meetId' 경로로 GET 요청이 들어오면 chatRoomController.getChatRoomInfo 함수를 호출

const express = require('express');
const router = express.Router();
const chatRoomController = require('../controllers/chat');

router.get('/chatRoom/:meetId', chatRoomController.getChatRoomInfo);

module.exports = router;


