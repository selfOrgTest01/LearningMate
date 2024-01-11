import React from 'react';
import { Container } from 'react-bootstrap';
import LectureCommentComponent from './LectureCommentComponent';

function LectureCommentSection() {
  return (
    <Container style={{ backgroundColor: '#ecf0f1', borderRadius: '15px' }}>
      <LectureCommentComponent />
    </Container>
  );
}

export default LectureCommentSection;
