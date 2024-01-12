const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');
const { comment } = require('../models/commentsDAO');

// 댓글 생성
router.post('/insert', commentsController.commentInsert);
// 댓글 삭제
router.delete('/delete/:comment_id', commentsController.commentDelete);
// 해당 강의 댓글 조회
router.get('/commentList/:course_id', commentsController.commentList);

router.get('/lecture-comment-list/:course_id', commentsController.lectureCommentList);

module.exports = router;