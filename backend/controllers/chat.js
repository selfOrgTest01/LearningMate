const chatRoomDAO = require('../models/chatRoomDAO');

// 채팅방 정보를 조회하는 컨트롤러
const getChatRoomInfo = async (req, res) => {
  try {
    const meetId = req.params.meetId;

    // chatRoomDAO를 통해 채팅방 정보를 조회
    chatRoomDAO.getChatRoomInfo(meetId, (result) => {
      if (result.status === 200) {
        const { initialRoom, channelList, participantList } = result.data;

        res.status(200).json({
          success: true,
          message: '채팅방 정보 조회 성공',
          data: {
            initialRoom,
            channelList,
            participantList,
          },
        });
      } else {
        console.error('채팅방 정보 조회 실패:', result.message);
        res.status(result.status).json({
          success: false,
          message: '채팅방 정보 조회 실패',
          error: result.message,
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: '채팅방 정보 조회 실패',
      error: error.message,
    });
  }
};

// 다른 컨트롤러들도 추가할 수 있습니다.

module.exports = {
  getChatRoomInfo,
  // 다른 컨트롤러들 추가
};