import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function LectureCommentComponent({ item }) {
  console.log(item);
  return (
    <Container className='my-4'>
      <div className='d-flex align-items-center'>
        <div className='flex-shrink-0'>
          <img src={item.profile_name} alt={`default.png`} style={{ width: '70px' }} />
        </div>
        <div className='flex-grow-1 ms-3'>
          <h4>{item.nickname}</h4>
          {item.content}
        </div>
      </div>
    </Container>
  );
}

export default LectureCommentComponent;
