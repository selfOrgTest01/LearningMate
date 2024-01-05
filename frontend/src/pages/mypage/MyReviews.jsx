import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../../components/Mypage/Sidebar';
import Header from '../../components/Mypage/Header';

function MyReviews() {
  return (
    <div>
      <Header />
      <Container fluid>
        <h1>MyReviews</h1>
        <Row>
          <Col xs={2} id='sidebar'>
            <Sidebar />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MyReviews;
