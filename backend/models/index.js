const participantsDAO = require('./participantsDAO.js'); // participantsDAO 파일의 경로로 수정
const chatRoomDAO = require('./chatRoomDAO.js'); // chatRoomDAO 파일의 경로로 수정

// 테스트할 모임 ID
const meetId = 19;

// chatRoomDAO.getChatRoomInfo 테스트
chatRoomDAO.getChatRoomInfo(meetId, (response) => {
  console.log('getChatRoomInfo 테스트 결과:', response);
});