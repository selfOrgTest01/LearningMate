/* eslint-disable no-console */
// 아직 안 됨 ㅜㅅㅜ
import axios from 'axios';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { Button, Form } from 'react-bootstrap';
import { localDomain } from '../../config/config';
import { changeData, clearData } from '../../store/reviewStore';

function MeetReviewForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm({ defaultValues: {} });
  const userInfo = useSelector((state) => state.userInfo);
  const meet_id = useParams().meetid;
  const { review } = useSelector((state) => state.reviewStore) || {};
  console.log('Review in MeetReviewForm:', review);
  const insertReview = useCallback(async () => {
    // Meet 데이터 생성
    const reviewData = {
      content: review.content,
      meet_id,
      user_id: userInfo.user_id,
    };

    try {
      // 리뷰 데이터를 서버로 전송
      const response = await axios.post(`${localDomain}/reviews/insert`, reviewData, {
        withCredentials: true,
      });

      console.log('리뷰 작성 완료:', response.data);
      // 리뷰 작성 후, 필요한 업데이트 또는 이동 작업 수행
      navigate(`../meets`);
    } catch (error) {
      console.error('리뷰 작성 오류:', error);
    }
  }, [review, meet_id, userInfo.user_id, navigate]);

  return (
    <Form onSubmit={handleSubmit(insertReview)}>
      <Form.Group controlId='reviewContent'>
        <Form.Label>리뷰 내용</Form.Label>
        <Form.Control
          name='content'
          className='form-control'
          {...register('content', { maxLength: 30 })}
          placeholder='30자 이하로 작성해주세요.'
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        작성 완료
      </Button>
    </Form>
  );
}

export default MeetReviewForm;
