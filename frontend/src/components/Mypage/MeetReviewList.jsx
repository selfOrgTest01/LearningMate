import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { commentAction } from '../../store/comment'; // 모임으로 바꾸기
import { localDomain } from '../../config/config';

const MeetReviewList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo);
  const commentList = useSelector((state) => state.comment.commentList); // 모임리스트로 바꾸기
  const [isLoading, setLoading] = useState(false);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${localDomain}/comments/my-comment-list/${userInfo.userId}`); // 모임으로 바꾸기
      dispatch(commentAction.insert({ commentList: response.data.data })); // 모임으로 바꾸기
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
      <h5>내가 작성한 모임 댓글 목록</h5>
      {commentList.length === 0 ? (
        <p>작성한 모임 댓글이 없습니다.</p>
      ) : (
        <ul>
          {commentList.map((review) => (
            <li key={review.comment_id} onClick={() => handleReviewClick(review.meet_id)}>
              {review.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MeetReviewList;
