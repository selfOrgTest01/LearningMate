import { Navbar, Container, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogoutFunction from '../containers/Header/LogoutFunction';

function Header() {
  const logoutUser = LogoutFunction();
  return (
    <Navbar bg='body-tertiary' expand='lg'>
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
        <Navbar.Toggle aria-controls='navbarColor04' />
        <Navbar.Collapse id='navbarColor04'>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/'>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to='/'>
              검색
            </Nav.Link>
            <Nav.Link as={Link} to='/meets'>
              {' '}
              {/* className={pathName === 'meets' ? "nav-link active" : "nav-link"} */}
              모임
            </Nav.Link>
            <Nav.Link as={Link} to='/courses'>
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
            {/* <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
              <NavDropdown.Item href='#'>Action</NavDropdown.Item>
              <NavDropdown.Item href='#'>Another action</NavDropdown.Item>
              <NavDropdown.Item href='#'>Something else here</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#'>Separated link</NavDropdown.Item>
            </NavDropdown> */}
            <Button type='button' onClick={logoutUser}>
              로그아웃
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
