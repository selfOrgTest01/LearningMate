const express = require('express');
const router = express.Router();
const chatRoomDAO = require('../models/chatRoomDAO');

router.get('/participants/chatroom-info/:meetId', async (req, res) => {
  const meetId = req.params.meetId;
  try {
    const chatRoomInfo = await chatRoomDAO.getChatRoomInfo(meetId);
    res.json(chatRoomInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 앱에서 라우팅 설정
const app = express();
app.use('/api', router);