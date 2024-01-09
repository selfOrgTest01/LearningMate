import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './styles/Calendar.css';

function MyCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null); // 선택한 일정 정보를 저장하는 state

  const addEvent = (date, content) => {
    // 기존 일정에 새 일정 추가
    setEvents([...events, { id: Date.now(), date, content }]);
  };

  const editEvent = (date, content) => {
    // 선택한 일정 수정
    const updatedEvents = events.map((event) =>
      event.date.toDateString() === date.toDateString() ? { date, content } : event,
    );
    setEvents(updatedEvents);
    setEditingEvent(null); // 모달 닫기
  };

  const deleteEvent = (date) => {
    // 선택한 일정 삭제
    const updatedEvents = events.filter((event) => event.date.toDateString() !== date.toDateString());
    setEvents(updatedEvents);
    setEditingEvent(null); // 모달 닫기
  };

  const tileContent = ({ date }) => {
    const eventForDate = events.find((event) => event.date.toDateString() === date.toDateString());

    return eventForDate ? (
      <p>
        {eventForDate.content} {''}
        <button className='edit-btn' onClick={() => setEditingEvent(eventForDate)}>
          수정
        </button>
        <button className='delete-btn' onClick={() => deleteEvent(eventForDate.date)}>
          삭제
        </button>
      </p>
    ) : null;
  };

  const onChange = (newDate) => {
    setSelectedDate(newDate);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (editingEvent) {
            const content = prompt('수정할 내용을 입력하세요.', editingEvent.content);
            if (content) {
              editEvent(editingEvent.date, content);
            }
          } else {
            const content = prompt('일정 내용을 입력하세요.');
            if (content) {
              addEvent(selectedDate, content);
            }
          }
        }}
      >
        <Calendar onChange={onChange} value={selectedDate} tileContent={tileContent} />
        <button className='add-btn' type='submit'>
          {editingEvent ? '일정 수정' : '일정 추가'}
        </button>
      </form>
    </div>
  );
}

export default MyCalendar;
