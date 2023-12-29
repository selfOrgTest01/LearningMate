const usersDao = require('../models/usersDAO');

exports.login = async (req, res) => {
    const userData = req.body;
    //세션에 저장할 user_id 세션 설정은 app.js같은 메인파일에서 합니다
    try {
         await usersDao.login(userData, (resp)=> {
            if (resp.status === 200) {
                req.session.userId = resp.sessionData;
            }
            res.send(resp);
        });
    } catch (err) {
        console.log(err);
    }
};
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