import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Col, Button } from 'react-bootstrap';
import MyProfileEdit from './MyProfileEdit';
import { userInfoAction } from '../../store/userInfo';
import { localDomain } from '../../config/config';
import './styles/UserProfile.css';

const UserProfile = () => {
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const userInfo = useSelector((state) => state.userInfo);
  console.log(userInfo);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  console.log(userInfo);
  const handleSaveEdit = async (editedData) => {
    try {
      // 수정된 데이터를 서버에 전송하는 API 호출
      await axios.patch(`${localDomain}/users/updateuserprofile/${userInfo.userId}`, editedData);
      // 수정이 성공하면 새로운 데이터로 상태 업데이트
      dispatch(
        userInfoAction.insert({
          userId: editedData.userId,
          nickname: editedData.nickname,
          email: editedData.email,
          phone_number: editedData.phone_number,
        }),
      );
      setIsEditMode(false);
    } catch (error) {
      console.error('데이터 업데이트 중 에러 발생:', error);
    }
  };

  return (
    <>
      {!isEditMode && (
        <>
          <h5 className='user-info'>
            <span className='info-label'>닉네임 : </span>
            {userInfo.nickname}
          </h5>
          <h5 className='user-info'>
            <span className='info-label'>전화번호 : </span>
            {userInfo.phone_number}
          </h5>
          <h5 className='user-info'>
            <span className='info-label'>이메일 : </span>
            {userInfo.email}
          </h5>
        </>
      )}
      <Col xs={10} id='content'>
        {isEditMode ? (
          <MyProfileEdit initialData={userInfo} onSave={handleSaveEdit} onCancel={handleCancelEdit} />
        ) : (
          <>
            <Button variant='primary' onClick={handleEditClick}>
              내 정보 수정하기
            </Button>
          </>
        )}
      </Col>
    </>
  );
};

export default UserProfile;
