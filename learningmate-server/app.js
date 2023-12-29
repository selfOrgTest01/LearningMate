const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const testRouter = require('./routes/test');
const chatRouter = require('./routes/chatRoom');
const app = express();
const session = require('express-session');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//origin: 클라이언트의 주소 , 다른 포트로 쿠키를 보낼때는 cors 옵션에  credentials: true 추가해야함
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
//saveUninitialized는 세션이 초기화될 때(예: 사용자가 웹사이트에 처음 방문했을 때) 세션을 저장할지 여부를 결정합니다.
//resave는 요청이 완료된 후(통신 후)에 세션을 저장할지 여부를 결정합니다.
app.use(
    session({
        secret: 'login session',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true, // 클라이언트에서 쿠키에 접근하는 것을 방지
            secure: false, // HTTPS를 통해서만 쿠키를 전송하도록 설정 (배포 시에는 true로 변경)
            maxAge: 3600000, // 쿠키의 만료 기간 (밀리초 단위, 여기서는 1시간)
        },
    })
);
//라우터
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(testRouter);
app.use('/chat-room', chatRouter);
app.use
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
//new 주석
module.exports = app;
