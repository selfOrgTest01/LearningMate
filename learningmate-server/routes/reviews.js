// 2023.12.22 수정 - 민경

/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();

const reviewDAO = require('./../models/reviewDAO');

// 게시물 생성
router.post('/insert', function(req, res, next) {
  const body = req.body;
  reviewDAO.insert(body, (resp) => {
    res.json(resp);
  })
});

// 게시물 삭제
router.delete('/delete/:review_id', function (req, res, next) { 
  const params = req.params;
  reviewDAO.delete(params, (resp) => {
    res.json(resp);
  });
});

// _번 게시물에 대한 리뷰 전체 조회
router.get('/reviewList/:review_id', function (req, res, next) { 
  const query = req.query;
  reviewDAO.reviewList(query, (resp) => {
    res.send(resp);
  })
});

// _번 게시물에 대한 _번 리뷰를 상세 보기
router.get('/review/:meet_id/:review_id', function (req, res, next) { 
  const params = req.params; 
  reviewDAO.review(params, (resp) => {
    res.send(resp);
  })});

module.exports = router;