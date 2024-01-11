// 개선사항
// (1. 라우팅가드 해야하나?)
// 2. 댓글, 조회수 추가
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Button, ButtonGroup, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { localDomain } from '../../config/config';

export default function LectureDetail() {
  const navigate = useNavigate();
  const course_id = useParams().courseid;
  const userInfo = useSelector((state) => state.userInfo);
  const [videoPath, setVideoPath] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState();
  const [userNickname, setUserNickname] = useState('');
  const [views, setViews] = useState(0);

  const getLectureDetail = useCallback(async () => {
    try {
      const resp = await axios.get(`${localDomain}/courses/course/${course_id}`, {
        params: { userId: userInfo.userId },
      });
      // 삭제된 게시글에 url로 접근하려고하면 팅겨 내버립니다
      if (resp.data.status === 500) {
        navigate('../');
      } else {
        setVideoPath(resp.data.data[0].attach_file_path);
        setTitle(resp.data.data[0].title);
        setContent(resp.data.data[0].content);
        setUserId(resp.data.data[0].user_id);
        setUserNickname(resp.data.data[0].nickname);
        // 실제로는 통신할때 서버에서 1을 증가시키지만 가져오는 데이터는 게시글 조회전 조회수를 가져오기 때문에 게시글에 조회전 조회수가 나오고
        // 게시글에서 나올때 조회수가 1증가 하는것처럼 보이는데 떄문에 애초에 게시글에 들어가면 보이는 조회수를 프론트에서 1증가한 값으로 출력해준다
        setViews(resp.data.data[0].view_cnt + 1);
      }
    } catch (error) {
      console.error('Error fetching lecture detail:', error);
    } finally {
      setLoading(false);
    }
  }, [course_id, navigate, userInfo.userId]);

  const onDelete = useCallback(async () => {
    try {
      await axios.delete(`${localDomain}/courses/delete/${course_id}`);
      navigate('../');
    } catch (error) {
      console.log(error);
    }
  });
  useEffect(() => {
    getLectureDetail();
  }, [getLectureDetail, course_id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Container style={{ width: '50%' }}>
        <h1 className='display-1 text-center' style={{ marginTop: 50 }}>
          {title}
        </h1>
        <video controls style={{ width: '100%' }}>
          <source src={videoPath} type='video/mp4' />
        </video>
        <Container style={{ width: '100%' }}>
          <h3>작성자:{userNickname}</h3>
          <h3>조회수:{views}</h3>
          <h2>{content}</h2>
        </Container>
        {userInfo.userId === userId && (
          <ButtonGroup>
            <Button variant='primary' onClick={() => navigate(`../update/${course_id}`)}>
              수정
            </Button>
            <Button variant='danger' onClick={onDelete}>
              삭제
            </Button>
          </ButtonGroup>
        )}
      </Container>
    </>
  );
}
