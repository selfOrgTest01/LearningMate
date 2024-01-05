import React from 'react';
import { Row, Col } from 'react-bootstrap';

function InfoSlide() {
  return (
    <Row style={{ height: '100%' }}>
      <Col
        xs={4}
        className='d-flex align-items-center justify-content-center text-center'
        style={{ height: '100%', borderRight: '1px solid #ccc' }}
      >
        {/* 좌측 구역 (3분의 1 크기) */}
        <div>
          {/* 좌측 구역 컨텐츠 */}
          <h3>Left Content</h3>
        </div>
      </Col>
      <Col xs={8} className='d-flex align-items-center justify-content-center text-center' style={{ height: '100%' }}>
        {/* 우측 구역 (나머지 크기) */}
        <div>
          {/* 우측 구역 컨텐츠 */}
          <h3>Right Content</h3>
        </div>
      </Col>
    </Row>
  );
}

export default InfoSlide;
