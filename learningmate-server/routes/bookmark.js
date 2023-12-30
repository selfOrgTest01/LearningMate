// 12.29 나현 추가

const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmark');

// 즐겨찾기 추가
router.post('/add', bookmarkController.addBookmark);
// 북마크 제거
router.post('/remove', bookmarkController.removeBookmark);
// 즐겨찾기 강의 조회
router.get('/list/:user_id', bookmarkController.getBookmarksByUserId);

module.exports = router;