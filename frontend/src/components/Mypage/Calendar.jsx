import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './styles/Calendar.css';

function MyCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const addEvent = (date, content) => {
    // 기존 이벤트에 새 이벤트 추가
    setEvents([...events, { id: Date.now(), date, content }]);
  };

  const deleteEvent = (id) => {
    // 해당 id를 가진 이벤트를 제외하고 새 이벤트 목록 설정
    setEvents(events.filter((event) => event.id !== id));
  };

  const tileContent = ({ date }) => {
    const eventForDate = events.find((event) => event.date.toDateString() === date.toDateString());

    return (
      <div>
        {eventForDate && (
          <>
            <p>{eventForDate.content}</p>
            <button className='delete-btn' onClick={() => deleteEvent(eventForDate.id)}>
              삭제
            </button>
          </>
        )}
      </div>
    );
  };

  const onChange = (newDate) => {
    setSelectedDate(newDate);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const content = prompt('이벤트 내용을 입력하세요.');
          if (content) {
            addEvent(selectedDate, content);
          }
        }}
      >
        <Calendar onChange={onChange} value={selectedDate} tileContent={tileContent} />
        <button className='add-btn' type='submit'>
          일정 추가
        </button>
      </form>
    </div>
  );
}

export default MyCalendar;
