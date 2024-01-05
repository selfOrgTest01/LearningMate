import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserProfile from '../../components/Mypage/UserProfile';
import Sidebar from '../../components/Mypage/Sidebar';
import Header from '../../components/Mypage/Header';
import Footer from '../../components/Mypage/Footer';

function MyInfo() {
  return (
    <div>
      <Header />
      <Container fluid>
        <h1>MyInfo</h1>
        <Row>
          <Col xs={2} id='sidebar'>
            <Sidebar />
          </Col>
          <Col xs={10} id='content'>
            <UserProfile />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default MyInfo;
