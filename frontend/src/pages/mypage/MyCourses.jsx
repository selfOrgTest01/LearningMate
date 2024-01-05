import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../../components/Mypage/Sidebar';
import Header from '../../components/Mypage/Header';

function MyCourses() {
  return (
    <div>
      <Header />
      <Container fluid>
        <h1>MyCourses</h1>
        <Row>
          <Col xs={2} id='sidebar'>
            <Sidebar />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MyCourses;
