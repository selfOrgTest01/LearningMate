// 12.27 나현 추가
// 01.03 나현 수정
// 01.05 나현 수정

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserProfile from '../../components/Mypage/UserProfile';
import Calendar from '../../components/Mypage/Calendar';
import Sidebar from '../../components/Mypage/Sidebar';
import Header from '../../components/Header';

function Mypage() {
  return (
    <div>
      <Header />
      <Container fluid>
        <h1>Mypage</h1>
        <Row>
          <Col xs={2} id='sidebar'>
            <Sidebar />
          </Col>
          <Col xs={10} id='content'>
            <UserProfile />
            <Calendar />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Mypage;
