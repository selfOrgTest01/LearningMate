const express = require('express');
const router = express.Router();
const chatpagingController = require('../controllers/chatpaging');

router.get('/chats/:meetId', chatpagingController.getChatMessages);

module.exports = router;
