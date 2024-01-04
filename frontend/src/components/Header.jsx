import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom'; // useLocation
import LogoutFunction from '../containers/Header/LogoutFunction';

function Header() {
  const logoutUser = LogoutFunction();

  // const location = useLocation();
  // const pathName = location.pathname.substring(1);

  return (
    <Navbar className='bg-body-tertiary'>
      <Container>
        <Navbar.Brand href='/'>
          <img
            alt=''
            src={`${process.env.PUBLIC_URL}/러닝메이트로고.png`}
            width='140'
            height='30'
            className='d-inline-block align-top'
          />{' '}
        </Navbar.Brand>
        <Nav className='me-auto'>
          <Nav.Link as={Link} to='/'>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to='/'>
            검색
          </Nav.Link>
<<<<<<< HEAD
          <Nav.Link as={Link} to="/courses">
=======
          <Nav.Link as={Link} to='/meets'>
            {' '}
            {/* className={pathName === 'meets' ? "nav-link active" : "nav-link"} */}
            모임
          </Nav.Link>
          <Nav.Link as={Link} to='/crouses'>
>>>>>>> 6d8255fd2cd23738ab55ebbf70678375b406f9cf
            강의
          </Nav.Link>
          <Nav.Link as={Link} to='/about'>
            About
          </Nav.Link>
          <Nav.Link as={Link} to='/sign-up'>
            회원가입
          </Nav.Link>
          <Nav.Link as={Link} to='/sign-in'>
            로그인
          </Nav.Link>
          <Nav.Link as={Link} to='/mypage'>
            마이페이지
          </Nav.Link>
        </Nav>
        <button type='button' onClick={logoutUser}>
          로그아웃
        </button>
      </Container>
    </Navbar>
  );
}
export default Header;
