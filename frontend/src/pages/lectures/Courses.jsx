import { Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// 12.27 나현 추가
function Courses() {
  const login = useSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();
  return (
    <Container>
      <h1>Courses</h1>
      {login && <Button onClick={() => navigate('./register')}>강의 업로드</Button>}
    </Container>
  );
}
export default Courses;
