import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className='page-footer font-small blue pt-4 ' style={{ borderTop: '1px solid #ddd' }}>
    <div className='container-fluid text-center text-md-left'>
      <div className='row'>
        <div className='col-md-6 mt-md-0 mt-3'>
          <h5 className='text-uppercase'>러닝메이트</h5>
          <p>자신의 러닝메이트들을 찾아보세요</p>
        </div>

        <hr className='clearfix w-100 d-md-none pb-0' />

        <div className='col-md-3 mb-md-0 mb-3'>
          <h5 className='text-uppercase'>탐색</h5>
          <ul className='list-unstyled'>
            <li>
              <Link to='/meets'>모임</Link>
            </li>
            <li>
              <Link to='/courses'>강의</Link>
            </li>
            <li>
              <Link to='/sign-in'>로그인</Link>
            </li>
            <li>
              <Link to='/sign-up'>회원가입</Link>
            </li>
          </ul>
        </div>

        <div className='col-md-3 mb-md-0 mb-3'>
          <h5 className='text-uppercase'>러닝메이트</h5>
          <ul className='list-unstyled'>
            <li>
              <Link to='/about'>정보</Link>
            </li>
            <li>
              <Link to='/about'>개발자소개</Link>
            </li>
            <li>
              <a href='#!'>커리어</a>
            </li>
            <li>
              <a href='#!'>블로그</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className='footer-copyright text-center py-3'>
      © 2020 Copyright:
      <a href='https://mdbootstrap.com/'> MDBootstrap.com</a>
    </div>
  </footer>
);

export default Footer;
