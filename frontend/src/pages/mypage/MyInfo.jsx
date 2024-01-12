import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserId from '../../components/Mypage/UserId';
import UserProfile from '../../components/Mypage/UserProfile';
import Sidebar from '../../components/Mypage/Sidebar';
import Header from '../../components/Mypage/Header';
import Footer from '../../components/Footer';
import '../../components/Mypage/styles/Title.css';

function MyInfo() {
  return (
    <div>
      <Header />
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
      <Footer />
    </div>
  );
}

export default MyInfo;
