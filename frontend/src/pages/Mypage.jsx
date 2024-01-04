// 12.27 나현 추가
// 01.03 나현 추가 수정

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Mypage() {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div>
      <h1>Mypage</h1>
      <Calendar onChange={onChange} value={date} />
    </div>
  );
}

export default Mypage;
