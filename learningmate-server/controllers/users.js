const usersDao = require("../models/usersDAO");
const multer = require("multer");
const path = require("path");

const staticPath = path.join(__dirname, "..", "learningmate-front", "public");

const uploadName = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) =>
            cb(null, path.join(staticPath, "..", "public", "images", "users")),
        filename: (req, file, cb) =>
            cb(null, `${Date.now()}_${file.originalname}`),
    }),
    limits: { fileSize: 1024 * 1024 * 3 },
});

exports.login = async (req, res) => {
    const userData = req.body;
    //세션에 저장할 user_id 세션 설정은 app.js같은 메인파일에서 합니다
    try {
        await usersDao.login(userData, (resp) => {
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

exports.userInfo = async (req, res) => {
    try {
        const userId = req.session.userId;
        await usersDao.userInfo(userId, (resp) => {
            res.send(resp);
        });
    } catch (err) {
        console.log(err);
    }
};

exports.logout = async (req, res) => {
    try {
        req.session.destroy();
        res.clearCookie("connect.sid");
        res.send({ status: 200, message: "로그아웃성공" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: "서버 오류" });
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
//회원가입 중복검사
exports.check = async (req, res) => {
    try {
        await usersDao.check((resp) => {
            res.send(resp);
        });
    } catch (err) {
        console.log(err);
    }
};

exports.image = async (req, res) => {
    const formdata = req.file;
    console.log(formdata);
    const { id } = req.params;
    console.log(id);
    // try {
    //     await usersDao.image(id, image, (resp) => {
    //         res.send(resp);
    //     });
    // } catch (err) {
    //     console.log(err);
    // }
};
