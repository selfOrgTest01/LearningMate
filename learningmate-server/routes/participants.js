// 2023.12.27 추가
// 2023.12.29 수정 중

const express = require('express');
const router = express.Router();
const participantsController = require('../controllers/participants');
const chatRoom = require('../models/chatRoomDAO');

// 참가자 추가
router.post('/insert', participantsController.participantInsert);
// 참여 여부 권한 수정 (status가 0 -> 1)
router.post('/update', participantsController.participantUpdate);
// 참가자 삭제 (매니저만 가능)
router.delete('/delete/:participant_id/:meet_id', participantsController.participantDelete);
// 전체 참여자 조회
router.get('/participantList/:meet_id', participantsController.participantList);

module.exports = router;





router.get('/chatroom-info/:meetId', async (req, res) => {
  const meetId = req.params.meetId;

  try {
    const chatRoomInfo = await chatRoomDAO.getChatRoomInfo(meetId);
    res.json(chatRoomInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});