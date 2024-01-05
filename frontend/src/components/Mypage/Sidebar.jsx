// 01.05 나현 추가

import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className='flex-column'>
      <NavLink to='/my-home' className='nav-link' activeClassName='active'>
        내 일정 조회하기
      </NavLink>
      <NavLink to='/my-info' className='nav-link' activeClassName='active'>
        내 정보 조회하기
      </NavLink>
      <NavLink to='/my-reviews' className='nav-link' activeClassName='active'>
        내 리뷰 모아보기
      </NavLink>
      <NavLink to='/meets' className='nav-link' activeClassName='active'>
        내 모임 모아보기
      </NavLink>
      <NavLink to='/courses' className='nav-link' activeClassName='active'>
        내 강의 모아보기
      </NavLink>
      <NavLink to='/waiting-meets' className='nav-link' activeClassName='active'>
        대기 중인 모임 보기
      </NavLink>
      <NavLink to='/my-meets' className='nav-link' activeClassName='active'>
        내가 만든 모임 보기
      </NavLink>
      <NavLink to='/my-courses' className='nav-link' activeClassName='active'>
        내가 올린 강의 보기
      </NavLink>
      <NavLink to='/withdraw' className='nav-link' activeClassName='active'>
        탈퇴하기
      </NavLink>
    </nav>
  );
};

export default Sidebar;
