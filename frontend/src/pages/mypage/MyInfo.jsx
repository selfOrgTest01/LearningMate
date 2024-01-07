import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import UserProfile from '../../components/Mypage/UserProfile';
import Sidebar from '../../components/Mypage/Sidebar';
import Header from '../../components/Mypage/Header';
import Footer from '../../components/Mypage/Footer';
import MyInfoEdit from '../../components/Mypage/MyInfoEdit';

function MyInfo() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    닉네임: 'nickname', // 예시로 초기값 설정
    전화번호: '010-1234-5678',
    이메일: 'example@email.com',
  });

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  const handleSaveEdit = (editedData) => {
    // 수정된 데이터를 저장하고
    // 서버에 업데이트 요청을 보낼 수도 있습니다.
    setUserInfo(editedData);
    setIsEditMode(false);
  };

  return (
    <div>
      <Header />
      <Container fluid>
        <h1>내 정보 조회하기</h1>
        <Row>
          <Col xs={2} id='sidebar'>
            <Sidebar />
          </Col>
          <Col xs={10} id='content'>
            {isEditMode ? (
              <MyInfoEdit onCancel={handleCancelEdit} onSave={handleSaveEdit} />
            ) : (
              <>
                <UserProfile userInfo={userInfo} />
                <Button variant='primary' onClick={handleEditClick}>
                  내 정보 수정하기
                </Button>
              </>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default MyInfo;
