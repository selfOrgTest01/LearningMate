import { useRecoilCallback, useRecoilValue } from 'recoil'

function participantsDetail() {

  // delete - 모임 생성자의 아이디와 비교해서 모임 생성자는 참가자를 삭제 가능하게 하고 본인도 탈퇴?할 수 있게 삭제 기능 주기
  const { deleteParticipant } = useRecoilValue(participantsSelector);

  const deleteParticipantEvent = useRecoilCallback(({ snapshot, set }) => async (meetId, participantId) => {
    // 이 부분에서 필요한 Recoil 상태 값을 가져와서 사용합니다.
    const loginUser = await snapshot.getPromise(loginUserState);

    // meetId를 사용하여 meet 정보를 가져옵니다.
    const meet = await snapshot.getPromise(getMeet(meetId));

    // 모임을 생성한 사람이거나 참가자 삭제를 수행하는 로직을 여기에 추가합니다.
    if (loginUser.userId === meet.userId || loginUser.userId === participantId) {
      // 여기에서 deleteParticipant 함수를 호출하여 참가자를 삭제합니다.
      deleteParticipant(meetId, participantId);
      // 필요에 따라 다른 작업을 수행할 수 있습니다.
    } else {
      setModalShow(true); // 모임을 생성한 사람 또는 참가자가 아닌 경우 모달을 표시할 수 있습니다.
    }
  }, []);

}