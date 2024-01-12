const express = require('express');
const router = express.Router();
const chatRoomController = require('../controllers/chat');

router.get('/chatRoom/:meetId/channels/:channelId', chatRoomController.getChannelChatRoomData);
router.get('/chatRoom/:meetId', chatRoomController.getChatRoomInfo);
router.get('/channels/:meetId', chatRoomController.getChannelList);
router.post('/sendMessage/:meetId/:channelId', chatRoomController.sendMessage);

module.exports = router;
