// 12.27 나현 추가

const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses');

// 강의 생성
router.post('/insert', coursesController.courseInsert);
// 강의 수정
router.patch('/update', coursesController.courseUpdate);
// 강의 삭제
router.delete('/delete/:course_id', coursesController.courseDelete);
// 전체 강의 조회
router.get('/courseList', coursesController.courseList);
// 강의 상세
router.get('/course/:course_id', coursesController.course);

module.exports = router;