/* eslint-disable no-console */
// 모임 디테일
// - 참석 인원 수 받기
import axios from 'axios';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { localDomain } from '../../config/config';
import MeetReviewForm from './MeetReviewForm';
import MeetDetailMapSection from '../../components/maps/MeetDetailMapSection';

function MeetDetail() {
  const navigate = useNavigate();
  const meet_id = useParams().meetid;
  const userInfo = useSelector((state) => state.userInfo);
  const login = useSelector((state) => state.auth.isAuth);
  // console.log(userInfo.userId);
  const [reviews, setReviews] = useState([]);
  const [reviewModalContent, setReviewModalContent] = useState(null);

  const [meet, setMeet] = useState({
    meet_id: '',
    nickname: '',
    email: '',
    title: '',
    content: '',
    start_date: '',
    end_date: '',
    max_num: null,
    onoff: false,
    image: '',
    category: '',
    createdAt: '',
    latitude: '',
    longitude: '',
  });

  const iconStyle = {
    display: 'flex',
    alignItems: 'left',
  };

  const iconImageStyle1 = {
    width: '24px',
    height: '24px',
    marginRight: '10px',
    marginLeft: '8px',
  };

  const iconImageStyle2 = {
    width: '20px',
    height: '20px',
    marginRight: '10px',
    marginLeft: '10px',
  };

  const getMeetDetailAndReviews = useCallback(async () => {
    try {
      const [meetResp, reviewResp] = await Promise.all([
        axios.get(`${localDomain}/meets/meet/${meet_id}`),
        axios.get(`${localDomain}/reviews/detail/${meet_id}/reviewList`),
      ]);

      // Meet 정보 설정
      if (meetResp.data.data.length > 0) {
        setMeet(meetResp.data.data[0]);
      }

      // 리뷰 정보 설정
      setReviews(reviewResp.data.data);
    } catch (error) {
      console.error(error);
    }
  }, [meet_id]);

  const joinMeet = () => {
    if (!login) {
      // 로그인되지 않은 경우 알림 메시지 표시
      window.alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      navigate('/sign-in');
    } else {
      // 로그인된 경우 참여 로직 실행
    }
  };

  console.log('userInfo.userId:', userInfo.userId);

  const openReviewModal = () => {
    setReviewModalContent(
      <MeetReviewForm
        meet_id={meet_id}
        getMeetDetailAndReviews={getMeetDetailAndReviews}
        handleClose={() => setReviewModalContent(null)}
      />,
    );
  };

  const deleteMeet = useCallback(async () => {
    try {
      await axios.delete(`${localDomain}/meets/delete/${meet_id}`);
      navigate('/meets'); // 삭제 후 meets로 이동
    } catch (error) {
      console.error(error);
    }
  }, [meet_id, navigate]);

  // 현재 사용자가 글을 작성한 사용자인지 여부를 확인
  const UserPostAuthor = meet.user_id === userInfo.user_id;

  useEffect(() => {
    getMeetDetailAndReviews();
  }, [getMeetDetailAndReviews]);

  useEffect(() => {}, [meet.meet_id]);

  useEffect(() => {}, [reviews]);

  return (
    <main id='main' style={{ background: 'white' }}>
      <section className='property-grid grid'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-8' style={{ marginTop: '50px' }}>
              <table className='table table-borderless'>
                <tbody>
                  <tr>
                    <td>{meet.title}</td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src={meet.image}
                        alt='모임이미지.jpg'
                        style={{ borderRadius: '15px', width: '880px', height: '450px' }}
                      ></img>
                    </td>
                  </tr>
                  <tr>
                    <td>{meet.content}</td>
                  </tr>
                  <tr>
                    <td colSpan='2' className='text-end'>
                      <button className='btn btn-primary btn-sm' onClick={() => navigate('/meets')}>
                        리스트
                      </button>{' '}
                      {userInfo.nickname === meet.nickname && (
                        <>
                          <button
                            className='btn btn-warning btn-sm'
                            onClick={() => navigate(`/update/${meet.meet_id}`)}
                          >
                            수정
                          </button>{' '}
                          <button className='btn btn-danger btn-sm' onClick={() => deleteMeet(meet.meet_id)}>
                            삭제
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              className='card p-3'
              style={{ width: '25rem', height: '20rem', marginTop: '95px', marginLeft: '40px' }}
            >
              <table>
                <tbody>
                  {/* 지도 */}
                  <tr>
                    <td>
                      {meet.onoff === 0 && <MeetDetailMapSection latitude={meet.latitude} longitude={meet.longitude} />}
                    </td>
                  </tr>
                  <tr>
                    <td>{meet.onoff ? '온라인' : '오프라인'}</td>
                  </tr>
                  {meet.onoff === 0 && (
                    <tr>
                      <td className='icon-only' style={iconStyle}>
                        <img src='/icons/icon-location.png' alt='Location Icon' style={iconImageStyle1} />
                        제주특별자치도 ...
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className='icon-only' style={iconStyle}>
                      <img src='/icons/icon-schedule.png' alt='Schedule Icon' style={iconImageStyle2} />
                      {moment(meet.start_date).format('YYYY-MM-DD hh:mm')} ~{' '}
                      {moment(meet.end_date).format('YYYY-MM-DD hh:mm')}
                    </td>
                  </tr>
                  <tr>
                    <td className='icon-only' style={iconStyle}>
                      작성자: {meet.nickname}
                    </td>
                  </tr>
                  <tr>
                    <td className='icon-only' style={iconStyle}>
                      참여자 수: {0}/{meet.max_num}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className='d-flex justify-content-end' style={{ marginTop: '130px' }}>
                <button
                  className='btn btn-primary btn-sm'
                  onClick={joinMeet}
                  style={{ width: '500px', height: '50px' }}
                >
                  참여
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* 리뷰 리스트 */}
        <div className='m-4'>
          {login && !UserPostAuthor && (
            <Button size='sm' variant='primary' onClick={openReviewModal} style={{ marginLeft: '80px' }}>
              리뷰 작성하기
            </Button>
          )}
          {/* 모달로 띄우기 */}
          <Modal show={reviewModalContent !== null} onHide={() => setReviewModalContent(null)}>
            <Modal.Header closeButton>
              <Modal.Title>리뷰 작성하기</Modal.Title>
            </Modal.Header>
            <Modal.Body>{reviewModalContent}</Modal.Body>
          </Modal>{' '}
          <div className='col' style={{ marginLeft: '80px', marginTop: '30px' }}>
            <h3>리뷰</h3>
            {reviews.length > 0 ? (
              <ul>
                {reviews.map((review) => (
                  <li key={review.review_id}>
                    <p>{review.content}</p>
                    <p>작성자: {review.nickname}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>리뷰가 없습니다.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default MeetDetail;

MeetDetail.defaultProps = {
  sub: '',
};
