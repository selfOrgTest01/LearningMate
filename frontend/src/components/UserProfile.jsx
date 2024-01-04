// 01.04 나현 추가

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 유저정보
function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/users/list');
        setUser(response.data); // 데이터베이스에서 가져온 유저 정보를 상태에 저장
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행되도록 합니다.

  return (
    <div>
      {loading ? (
        <p>Loading user data...</p>
      ) : (
        <div>
          <h2>User Profile</h2>
          <p>
            Name:
            {' '}
            {user.name || 'N/A'}
          </p>
          <p>
            Email:
            {' '}
            {user.email || 'N/A'}
          </p>
          {/* 기타 유저 정보 출력 */}
        </div>
      )}
    </div>
  );
}

export default UserProfile;
