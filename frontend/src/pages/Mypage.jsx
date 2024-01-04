// 12.27 나현 추가
// 01.03 나현 추가 수정

import React from 'react';
import UserProfile from '../components/UserProfile';
import Calendar from '../components/Calendar';

function Mypage() {
  return (
    <div>
      <h1>Mypage</h1>
      <UserProfile />
      <Calendar />
    </div>
  );
}

export default Mypage;
