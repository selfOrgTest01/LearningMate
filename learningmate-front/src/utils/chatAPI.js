const axios = require('axios');

// axios를 사용한 코드
const meetId = 123;

// chatRoomDAO를 통해 채팅방 정보를 요청
axios.post('/participants/move-to-chatroom', { meetId })
  .then(function (response) {
    const chatRoomId = response.data.chatRoomId;

    // 모임에 대한 초기 채팅방 정보를 가져옴
    axios.get(`/participants/chatroom-info/${chatRoomId}`)
      .then(function (chatRoomInfo) {
        // 채팅방 정보를 사용하여 프론트엔드 로직 추가
        handleChatRoomInfo(chatRoomInfo.data);
      })
      .catch(function (error) {
        console.error(error);
      });

    // 채팅방으로 이동하는 프론트엔드 로직 추가
    moveToChatRoomFrontend(chatRoomId);
  })
  .catch(function (error) {
    console.error(error);
  });



// chatRoomDAO를 사용한 코드:
// const meetId = 123;

// chatRoomDAO를 통해 채팅방 정보를 요청
chatRoomDAO.getChatRoomInfo(meetId, (response) => {
  if (response.status === 200) {
    // 응답에서 채팅방 정보를 활용
    const { initialRoom, channelList, participantList } = response.data;
    console.log('초기 채팅방 정보:', initialRoom);
    console.log('채널 목록:', channelList);
    console.log('참가자 목록:', participantList);
  } else {
    console.error('채팅방 정보 조회 실패:', response.error);
  }
});