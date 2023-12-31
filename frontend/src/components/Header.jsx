import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import LogoutFunction from '../containers/Header/LogoutFunction';

function Header() {
  const logoutUser = LogoutFunction();
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt=""
            src={`${process.env.PUBLIC_URL}/러닝메이트로고.png`}
            width="140"
            height="30"
            className="d-inline-block align-top"
          />
          {' '}
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/">
            검색
          </Nav.Link>
          <Nav.Link as={Link} to="/crouses">
            강의
          </Nav.Link>
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/sign-up">
            회원가입
          </Nav.Link>
          <Nav.Link as={Link} to="/sign-in">
            로그인
          </Nav.Link>
          <Nav.Link as={Link} to="/mypage">
            마이페이지
          </Nav.Link>
        </Nav>
        <button type="button" onClick={logoutUser}>로그아웃</button>
      </Container>
    </Navbar>
  );
}
export default Header;
