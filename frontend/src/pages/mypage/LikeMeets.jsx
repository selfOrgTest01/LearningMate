import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../../components/Mypage/Sidebar';
import Header from '../../components/Mypage/Header';

function LikeMeets() {
  return (
    <div>
      <Header />
      <Container fluid>
        <h1>LikeMeets</h1>
        <Row>
          <Col xs={2} id='sidebar'>
            <Sidebar />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LikeMeets;
