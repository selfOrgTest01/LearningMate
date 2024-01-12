import { useSelector } from 'react-redux';

const UserId = () => {
  const userInfo = useSelector((state) => state.userInfo);

  return (
    <>
      <h3>
        {userInfo.nickname}
        님, 안녕하세요.
      </h3>
    </>
  );
};

export default UserId;
