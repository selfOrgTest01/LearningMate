import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getReviewAction } from '../../store/reviewStore'; // 모임으로 바꾸기
import { localDomain } from '../../config/config';

const MeetReviewList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo);
  const reviewList = useSelector((state) => state.reviewStore.reviewList || []); // 모임리스트로 바꾸기
  const [isLoading, setLoading] = useState(false);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${localDomain}/reviews/review/${userInfo.userId}`); // 모임으로 바꾸기
      dispatch(getReviewAction({ reviewList: response.data.data })); // 모임으로 바꾸기
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [dispatch, userInfo.userId]);

  const handleReviewClick = (meet_id) => {
    navigate(`/detail/${meet_id}`);
  };

  return (
    <div>
      <h5>내가 작성한 모임 리뷰 목록</h5>
      {Array.isArray(reviewList) && reviewList.length === 0 ? (
        <p>작성한 모임 리뷰가 없습니다.</p>
      ) : (
        <ul>
          {Array.isArray(reviewList) &&
            reviewList.map((review) => (
              <li key={review.review_id} onClick={() => handleReviewClick(review.meet_id)}>
                {review.content}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default MeetReviewList;
