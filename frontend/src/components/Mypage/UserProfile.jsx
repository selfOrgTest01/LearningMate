// 01.04 나현 추가
// 01.05 나현 수정

import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [userId, setUserId] = useState('');
  const [nickname, setNickname] = useState('');

  const getUserIdFromServer = async () => {
    // 비동기 동작 수행
    const response = await fetch('/api/getUserId');
    const data = await response.json();
    return data.userId;
  };

  const getNicknameFromServer = async (id) => {
    // 비동기 동작 수행
    const response = await fetch(`/api/getNickname/${id}`);
    const data = await response.json();
    return data.nickname;
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const fetchedUserId = await getUserIdFromServer();
        setUserId(fetchedUserId); // 상위 스코프에서 이미 선언된 userId를 사용
        const nicknameFromServer = await getNicknameFromServer(fetchedUserId);
        setNickname(nicknameFromServer);
      } catch (error) {
        console.error('사용자 프로필을 불러오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchUserProfile();
  }, []); // 빈 배열을 전달하여 componentDidMount와 같은 동작을 하도록 함

  return (
    <div>
      <h3>사용자 프로필</h3>
      <p>사용자 ID: {userId}</p>
      <p>닉네임: {nickname}</p>
    </div>
  );
};

export default UserProfile;
