import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function LectureDetailSection({ lectureInfo }) {
  const lectureDetail = useSelector((state) => state.lectureDetail);
  return (
    <Container className='my-4' style={{ width: '100%', backgroundColor: '#ecf0f1', borderRadius: '15px' }}>
      <h2>제목: {lectureDetail.title}</h2>
      <h3>작성자:{lectureDetail.registerNickname}</h3>
      <h4>조회수:{lectureInfo.views}</h4>
      <p>{lectureDetail.content}</p>
    </Container>
  );
}

export default LectureDetailSection;
