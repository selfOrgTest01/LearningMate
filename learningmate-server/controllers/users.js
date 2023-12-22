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
