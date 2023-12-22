const usersDao = require('../models/usersDAO');

exports.signupUser = async (req, res) => {
    const userData = req.body;
    try {
        await usersDao.signUp(userData, (resp) => {
            res.send(resp);
        });
    } catch (err) {
        console.log(err);
    }
};

exports.userList = async (req, res) => {
    try {
        await usersDao.userList((resp) => {
            res.send(resp);
        });
    } catch (err) {
        console.log(err);
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await usersDao.delete(id, (resp) => {
            res.send(resp);
        });
    } catch (err) {
        console.log(err);
    }
};

exports.check = async (req, res) => {
    try {
        await usersDao.check((resp) => {
            res.send(resp);
        });
    } catch (err) {
        console.log(err);
    }
};
