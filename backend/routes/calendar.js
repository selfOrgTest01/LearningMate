const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendar');

// 일정 불러오기
router.get('/getEvents/:user_id', calendarController.getEvents);
// 일정 추가(생성)하기
router.post('/insert', calendarController.insertEvents);
// 일정 수정하기
router.post('/update/:calendar_id', calendarController.updateEvents)
// 일정 삭제하기
router.delete('/delete/:calendar_id', calendarController.deleteEvents)

module.exports = router;
