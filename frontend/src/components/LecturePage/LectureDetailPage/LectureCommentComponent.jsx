import React from 'react';
import { Container } from 'react-bootstrap';

function LectureCommentComponent() {
  return (
    <Container>
      <div class='d-flex align-items-center'>
        <div class='flex-shrink-0'>
          <img src={`${process.env.PUBLIC_URL}/img/default.png`} alt='...' style={{ width: '70px' }} />
        </div>
        <div class='flex-grow-1 ms-3'>
          <h4>Name</h4>
          This is some content from a media component. You can replace this with any content and adjust it as needed.
        </div>
      </div>
    </Container>
  );
}

export default LectureCommentComponent;
