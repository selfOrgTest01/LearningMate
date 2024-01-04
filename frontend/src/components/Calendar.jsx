// 01.03 나현 추가

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// 달력
function MyCalendar() {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div>
      <Calendar onChange={onChange} value={date} />
    </div>
  );
}

export default MyCalendar;
