import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserId from '../../components/Mypage/UserId';
import UserProfile from '../../components/Mypage/UserProfile';
import Sidebar from '../../components/Mypage/Sidebar';
import '../../components/Mypage/styles/Title.css';

function MyInfo() {
  return (
    <div>
      <Container fluid>
        <h2 className='title'>내 정보 조회하기</h2>
        <Row>
          <Col xs={2} id='sidebar'>
            <Sidebar />
          </Col>
          <Col xs={10} id='content'>
            <UserId />
            <UserProfile />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MyInfo;
