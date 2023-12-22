// 2023.12.22 수정 - 민경

/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();

const meetDAO = require('./../models/meetDAO');

// 게시물 생성
router.post('/insert', function(req, res, next) {
  const body = req.body;
  meetDAO.insert(body, (resp) => {
    res.json(resp);
  })
});

// 게시물 수정
router.put('/update', function (req, res, next) {
  const body = req.body;
  meetDAO.update(body, (resp) => {
    res.json(resp);
  });
});

// 게시물 삭제
router.delete('/delete/:meet_id', function (req, res, next) { 
  const params = req.params;
  meetDAO.delete(params, (resp) => {
    res.json(resp);
  });
});

// 전체 게시물 조회
router.get('/meetList', function (req, res, next) { 
  const query = req.query;
  meetDAO.meetList(query, (resp) => {
    res.send(resp);
  })
});

// 게시물 상세
router.get('/meet/:meet_id', function (req, res, next) { 
  const params = req.params; 
  meetDAO.meet(params, (resp) => {
    res.send(resp);
  })});

module.exports = router;