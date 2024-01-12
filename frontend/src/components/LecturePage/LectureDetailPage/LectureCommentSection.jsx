import React, { useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';
import LectureCommentComponent from './LectureCommentComponent';
import LectureCommentInput from './LectureCommentInput';
import { localDomain } from '../../../config/config';

function LectureCommentSection() {
  const auth = useSelector((state) => state.auth.isAuth);
  const course_id = useParams().courseid;
  const [commentList, setCommentList] = useState([]);

  const fetchData = useCallback(async () => {
    const resp = await axios.get(`${localDomain}/comments/lecture-comment-list/${course_id}`);
    setCommentList(resp.data.data);
  }, [course_id]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <>
      {auth ? <LectureCommentInput /> : <h3>로그인을 해주세요</h3>}
      <Container style={{ backgroundColor: '#ecf0f1', borderRadius: '15px' }}>
        {commentList.map((item, index) => (
          <LectureCommentComponent key={index} item={item} />
        ))}
      </Container>
    </>
  );
}

export default LectureCommentSection;
