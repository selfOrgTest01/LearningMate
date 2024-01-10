import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './styles/Calendar.css';
import { localDomain } from '../../config/config';

function MyCalendar() {
  const userInfo = useSelector((state) => state.userInfo);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editingEvent, setEditingEvent] = useState(null);

  const fetchUserEvents = useCallback(async () => {
    try {
      const response = await axios.get(`${localDomain}/calendar/getEvents/${userInfo.userId}`);
      const { status, data } = response.data;

      if (status === 200) {
        setEvents(data);
      } else {
        console.error('일정 불러오기 실패:', data.error);
      }
    } catch (error) {
      console.error('일정 불러오기 에러:', error);
    }
  }, [userInfo]);

  const handleEventOperation = async (url, method, calendarId, date, content) => {
    try {
      const eventData = {
        user_id: userInfo.userId,
        date,
        content,
      };

      let response;

      if (method === 'post') {
        response = await axios.post(url, eventData);
      } else if (method === 'put') {
        response = await axios.put(`${localDomain}/calendar/update/${calendarId}`, eventData);
      } else if (method === 'delete') {
        response = await axios.delete(`${localDomain}/calendar/delete/${calendarId}`);
      }

      const { status, data } = response.data;

      if (status === 200) {
        if (method === 'post') {
          const updatedEvents = [...events, { date, content }];
          setEvents(updatedEvents);
        } else if (method === 'put') {
          const updatedEvents = events.map((event) =>
            event.date.toDateString() === date.toDateString() ? { ...event, date, content } : event,
          );
          setEvents(updatedEvents);
          setEditingEvent(null);
        } else if (method === 'delete') {
          const updatedEvents = events.filter((event) => event.date.toDateString() !== date.toDateString());
          setEvents(updatedEvents);
          setEditingEvent(null);
        }
      } else {
        console.error(`일정 ${method} 실패:`, data.error);
      }
    } catch (error) {
      console.error(`일정 ${method} 에러:`, error);
    }
  };

  const tileContent = ({ date }) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const eventForDate = events.find((event) => event.date === formattedDate);

    return eventForDate ? (
      <p>
        {eventForDate.content}{' '}
        <button className='edit-btn' onClick={() => setEditingEvent(eventForDate)}>
          수정
        </button>
        <button
          className='delete-btn'
          onClick={() =>
            handleEventOperation(
              `${localDomain}/calendar/delete`,
              'delete',
              eventForDate.calendar_id,
              eventForDate.date,
            )
          }
        >
          삭제
        </button>
      </p>
    ) : null;
  };

  const onChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingEvent) {
      const content = prompt('수정할 내용을 입력하세요.', editingEvent.content);
      if (content) {
        await handleEventOperation(
          `${localDomain}/calendar/update`,
          'put',
          editingEvent.calendar_id,
          editingEvent.date,
          content,
        );
      }
    } else {
      const content = prompt('일정 내용을 입력하세요.');
      if (content) {
        const date = moment(selectedDate).format('YYYY-MM-DD');
        await handleEventOperation(`${localDomain}/calendar/insert`, 'post', null, date, content);
      }
    }
  };

  useEffect(() => {
    fetchUserEvents();
  }, [fetchUserEvents]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Calendar onChange={onChange} value={selectedDate} tileContent={tileContent} />
        <button className='add-btn' type='submit'>
          {editingEvent ? '일정 수정' : '일정 추가'}
        </button>
      </form>
    </div>
  );
}

export default MyCalendar;
