import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../../components/Mypage/Sidebar';
import '../../components/Mypage/styles/Title.css';
import UserLikeMeets from '../../components/Mypage/UserLikeMeets';

function LikeMeets() {
  return (
    <div>
      <Container fluid>
        <h2 className='title'>내 모임 모아보기</h2>
        <Row>
          <Col xs={2} id='sidebar'>
            <Sidebar />
          </Col>
          <Col xs={10} id='content'>
            <UserLikeMeets />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LikeMeets;
