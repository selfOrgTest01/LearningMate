// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', (socket) => {
//   console.log('a user connected');

//   // 채팅 메시지 수신 및 브로드캐스트
//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg);
//   });

//   // 연결 해제 시 로그
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

// // 서버 리스닝
// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


// const express = require('express');
// const router = express.Router();
// const db = require('../src/database');

// /* GET users listing. */
// router.get('/chat', function (req, res, next) {
//   res.send('respond with a resource');
// });

// // router.post('/', async (req, res, next) => {
// //   const sql = 'INSERT INTO notice(title, content) VALUES (?,?)'
// //   const [row, field] = await db.query(sql, ['bad title', 'bad content']);
// //   console.log('row: ', row);
// //   console.log('field: ', field);

// //   res.send('respond with a resource');
// // });



// module.exports = router;


채팅방 목록 조회:

엔드포인트: /api/chat-rooms
HTTP
설명: 모든 채팅방의 목록을 조회하는 엔드포인트
특정 채팅방 조회:

엔드포인트: /api/chat-rooms/:roomId
HTTP 메서드: GET
설명: 특정 채팅방의 정보와 채팅 내용을 조회하는 엔드포인트 (:roomId는 동적으로 채팅방 ID를 나타냄)
채팅 메시지 전송:

엔드포인트: /api/chat-rooms/:roomId/messages
시간
설명: 특
사용자 참여:

엔드포인트: /api/chat-rooms/:roomId/join
HT
설명: 특정 채팅방에 사용자를 참여시키는 엔드포인트