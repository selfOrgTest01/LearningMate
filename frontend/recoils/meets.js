/* eslint-disable no-unused-vars */
import axios from 'axios';
import { atom, selector } from 'recoil';

const baseURL = 'http://localhost:8000/meets/';

//// atom
// Meet 목록을 담는 전역 상태
export const meetListState = atom({
  key: 'meets/meetListState',
  default: {},
});

// 특정 Meet의 상세 정보를 담는 전역 상태
export const meetState = atom({
  key: 'meets/meetState',
  default: {
    meet_id: '',
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
    updatedAt: '',
    user_id: '',
  },
});

//// selector
export const meetListSelector = selector({ // 여러 가지 get 함수들을 포함하는 selector를 정의
  key: 'meets/meetSelector',
  get: ({ get, getCallback }) => {

    //  Meet 목록을 가져오는 함수로, axios를 사용하여 서버에서 데이터를 받아와 meetListState 상태를 업데이트
    const getMeetList = getCallback(({ set }) => async (no, size) => {
      const resp = await axios.get(`${baseURL}`, { params: { no, size } });
      set(meetListState, resp.data);
    });

    // 특정 Meet의 상세 정보를 가져오는 함수로, 해당 정보를 meetState 상태에 업데이트
    const getMeet = getCallback(
      ({ set }) =>
        async (id) => {
          const resp = await axios.get(`${baseURL}${id}`);
          console.log('meet', resp.data.meet);
          set(meetState, resp.data.meet);
        },
      []
    );

    // Meet 정보를 업데이트하는 함수로, axios.put을 사용하여 서버에 업데이트된 정보를 전송
    const updateMeet = getCallback(({ set }) => async (item) => {
      const resp = await axios.put(`${baseURL}`, item);
      console.log('update', resp);
    });

    // Meet을 추가하는 함수로, axios.post를 사용하여 새로운 Meet 정보를 서버에 전송
    const insertMeet = getCallback(({ set }) => async (item) => {
      const resp = await axios.post(`${baseURL}`, item);
      console.log('insert', resp);
    });

    // Meet을 삭제하는 함수로, axios.delete를 사용하여 서버에서 해당 Meet을 삭제
    const deleteMeet = getCallback(({ set }) => async (id) => {
      const resp = await axios.delete(`${baseURL}${id}`);
      console.log('delete', resp);
    });

    return { getMeetList, getMeet, updateMeet, insertMeet, deleteMeet };
  },
});
