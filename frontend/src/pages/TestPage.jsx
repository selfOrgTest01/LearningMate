// 서버 테스트용 페이지
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Test() {
  const [data, setData] = useState({ email: '', phone_number: '', nickname: '' });
  const [isloading, setLoading] = useState(true);
  const auth = useSelector((state) => state.auth.isAuth);
  // console.log(auth);
  const localDomain = 'http://localhost:8000';
  const getData = useCallback(async () => {
    try {
      // 데이터 get요청 withCredentials: true 옵션을 추가하면 세션 쿠키가 요청에 올바르게 포함되어 서버에 전달됩니다.
      const resp = await axios.get(`${localDomain}/users/userinfo`, {
        withCredentials: true,
      });
      console.log(resp.data.data);
      if (resp.data.data === false) window.alert('불러오기 실패');
      else setData((currentData) => ({ ...currentData, ...resp.data.data[0] }));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);
  if (isloading) {
    return <div>Loading....</div>;
  }
  return (
    <>
      <h1>test</h1>
      <h2>Sever Data:</h2>
      <h2>테스트용입니다~!!</h2>
      <h2>
        email:
        {data.email}
      </h2>
      <h2>
        휴대폰번호:
        {data.phone_number}
      </h2>
      <h2>
        nickname:
        {data.nickname}
      </h2>
      <h2>
        로그인상태:
        {auth.toString()}
      </h2>
    </>
  );
}

export default Test;
