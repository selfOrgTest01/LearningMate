import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../../components/Mypage/Sidebar';
import '../../components/Mypage/styles/Title.css';
import UserUploadedCourses from '../../components/Mypage/UserUploadedCourses';

function MyCourses() {
  return (
    <div>
      <Container fluid>
        <h2 className='title'>내가 올린 강의 보기</h2>
        <Row>
          <Col xs={2} id='sidebar'>
            <Sidebar />
          </Col>
          <Col xs={10} id='content'>
            <UserUploadedCourses />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MyCourses;
