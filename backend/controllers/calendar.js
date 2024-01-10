const calendarDAO = require('../models/calendarDAO');

exports.getEvents = async (req, res) => {
  const { user_id } = req.params;
  try {
    const resp = await calendarDAO.getEvents(user_id);
    res.status(resp.status).send(resp);
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 500, message: '일정 조회 실패', error: error.message });
  }
};

exports.insertEvents = async (req, res) => {
  const calendarData = req.body;
  try {
    const resp = await calendarDAO.insertEvents(calendarData);
    res.status(resp.status).send(resp);
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 500, message: '일정 생성 실패', error: error.message });
  }
};

exports.updateEvents = async (req, res) => {
  const { calendar_id } = req.params;
  const updatedData = req.body;
  try {
    const resp = await calendarDAO.updateEvents(calendar_id, updatedData);
    res.status(resp.status).send(resp);
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 500, message: '일정 수정 실패', error: error.message });
  }
};

exports.deleteEvents = async (req, res) => {
  const { calendar_id } = req.params;
  try {
    const resp = await calendarDAO.deleteEvents(calendar_id);
    res.status(resp.status).send(resp);
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 500, message: '일정 삭제 실패', error: error.message });
  }
};