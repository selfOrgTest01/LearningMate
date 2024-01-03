/* eslint-disable default-param-last */
// 액션 타입 정의
const MEET_DETAIL = 'MEET_BOARD_DETAIL'; // 게시물 상세 정보
const MEET_CHANGE_DATA = 'MEET_CHANGE_DATA'; // 게시물 데이터 수정
const MEET_CLEAR_DATA = 'MEET_CLEAR_DATA'; // 게시물 데이터 초기화

// 액션 생성자 정의
export const getMeetAction = (data) => ({ type: MEET_DETAIL, payload: data });
export const changeData = (evt) => ({ type: MEET_CHANGE_DATA, payload: evt.target });
export const clearData = () => ({ type: MEET_CLEAR_DATA });

// 초기 상태 정의
const init = {
  // initialState
  meet: {
    meet_id: '',
    nickname: '',
    email: '',
    title: '',
    content: '',
    start_date: '',
    end_date: '',
    max_num: '',
    onoff: '',
    image: '',
    category: '',
    approve: '',
    createdAt: '',
  },
};

// reducer 정의
const meetStore = (state = init, action) => {
  switch (action.type) {
    case MEET_DETAIL:
      return { ...state, meet: action.payload };
    case MEET_CHANGE_DATA:
      return { ...state, meet: { ...state.meet, [action.payload.name]: action.payload.value } };
    case MEET_CLEAR_DATA:
      return {
        ...state,
        meet: {
          meet_id: '',
          nickname: '',
          email: '',
          title: '',
          content: '',
          start_date: '',
          end_date: '',
          max_num: '',
          onoff: '',
          image: '',
          category: '',
          approve: '',
          createdAt: '',
        },
      };
    default:
      return state;
  }
};
export default meetStore;
