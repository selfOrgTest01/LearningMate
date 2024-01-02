// 12.27 나현 추가

const coursesDAO = require('../models/coursesDAO');

exports.courseInsert = async (req, res) => {
  const courseData = req.body;
  try {
    await coursesDAO.insert(courseData, (resp) => {
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.courseUpdate = async (req, res) => {
  const courseData = req.body;
  try {
    await coursesDAO.update(courseData, (resp) => {
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.courseDelete = async (req, res) => {
  const { course_id } = req.params;
  try {
    await coursesDAO.delete(course_id, (resp) => {
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.courseList = async (req, res) => {
  const course_list = req.query;
  try {
    await coursesDAO.courseList(course_list, (resp) => {
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.course = async (req, res) => {
  const { course_id } = req.params;
  try {
    await coursesDAO.course(course_id, (resp) => {
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
  }
};