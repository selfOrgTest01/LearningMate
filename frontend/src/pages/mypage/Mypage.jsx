// 12.27 나현 추가
// 01.03 나현 수정
// 01.05 나현 수정

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserId from '../../components/Mypage/UserId';
import Calendar from '../../components/Mypage/Calendar';
import Sidebar from '../../components/Mypage/Sidebar';
import Header from '../../components/Mypage/Header';
import Footer from '../../components/Mypage/Footer';

function Mypage() {
  return (
    <div>
      <Header />
      <Container fluid>
        <h1>내 일정 조회하기</h1>
        <Row>
          <Col xs={2} id='sidebar'>
            <Sidebar />
          </Col>
          <Col xs={10} id='content'>
            <UserId />
            <Calendar />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Mypage;
