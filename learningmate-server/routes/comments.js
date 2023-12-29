// 12.28 나현 추가

const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');

// 댓글 생성
router.post('/insert', commentsController.commentInsert);
// 댓글 삭제
router.delete('/delete/:comment_id', commentsController.commentDelete);
// 전체 댓글 조회
router.get('/commentList', commentsController.commentList);

module.exports = router;