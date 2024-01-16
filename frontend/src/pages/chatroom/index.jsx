/* eslint-disable no-console */
import axios from 'axios';
import gravatar from 'gravatar';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import ChannelList from './ChannelList/index';
import Menu from '../../components/Menu/index';
import useInput from './hooks/useInput';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Input, Label } from './style2';
import ChatBox from './ChatBox/index';
import { userInfoAction } from '../../store/userInfo';
import makeSection from './utils/makeSection';
import MyCalendar from './components/Calendar';

import {
  AddButton,
  ProfileImg,
  ProfileModal,
  RightMenu,
  LogOutButton,
  WorkspaceWrapper,
  Channels,
  MenuScroll,
  Chats,
  ChannelTitleBox,
  ChannelTitle,
  Header,
} from './style1';

const ChatRoom = () => {
  const { meetId, channelId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userinfo = useSelector((state) => state.userInfo);
  const [roomData, setRoomData] = useState([]);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [targetElement, setTargetElement] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);

  const getUserData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8000/users/list`, { withCredentials: true });
      const loggedInUser = response.data.data.find((user) => user.user_id === userinfo.userId);

      if (loggedInUser) {
        dispatch(
          userInfoAction.insert({
            userId: loggedInUser.user_id,
            nickname: loggedInUser.nickname,
            email: loggedInUser.email,
            phone_number: loggedInUser.phone_number,
            profilePath: loggedInUser.profilePath,
          }),
        );
      }
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, userinfo.userId]);

  const onChannelClick = useCallback(
    async (channel) => {
      try {
        const response = await axios.get(
          `http://localhost:8000/chat/chatRoom/${meetId}/channels/${channel.channel_id}`,
        );
        setRoomData(response.data.data.channelChatRoomData);
        setSelectedChannel(channel);
      } catch (error) {
        console.error(error);
      }
    },
    [meetId],
  );

  const getChatData = useCallback(async () => {
    try {
      if (channelId !== null) {
        const response = await axios.get(`http://localhost:8000/chat/chatRoom/${meetId}/channels/${channelId}`);
        setRoomData(response.data.data.channelChatRoomData);
      }
    } catch (error) {
      console.error(error);
    }
  }, [meetId, channelId]);

  useEffect(() => {
    const pollingInterval = setInterval(() => {
      getChatData();
    }, 1000);

    return () => clearInterval(pollingInterval);
  }, [channelId, meetId, getChatData]);

  useEffect(() => {
    getUserData();
    getChatData();
  }, [getUserData, getChatData]);

  const onSubmitForm = (e) => {
    e.preventDefault();
  };

  const onLogOut = useCallback(async () => {
    try {
      await axios.get(`http://localhost:8000/users/logout`);
      navigate('/');
    } catch (error) {
      console.dir(error);
      toast.error(error.response?.data, { position: 'bottom-center' });
    }
  }, [navigate]);

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);

  const groupedRoomData = makeSection(roomData);

  const navigateToChatForDate = (clickedDate) => {
    navigate(`/chat/chatRoom/${meetId}/channels/${channelId}`);
  };

  const handleDateClick = () => {
    setIsCalendarOpen(true);
    // setTargetElement(/* specify the target element for positioning the calendar */);
  };

  const handleSmallCalendarChange = (newDate) => {
    setIsCalendarOpen(false);
    navigateToChatForDate(newDate);
  };

  return (
    <>
      <Header>
        {userinfo.nickname && (
          <RightMenu>
            <span
              onClick={onClickUserProfile}
              onMouseOver={() => setIsProfileHovered(true)}
              onMouseOut={() => setIsProfileHovered(false)}
              style={{
                position: 'relative',
                display: 'inline-block',
              }}
            >
              <ProfileImg
                src={gravatar.url(userinfo.nickname, { s: '28px', d: 'retro' })}
                alt={userinfo.nickname}
                style={{
                  borderRadius: '20%',
                  width: '40px',
                  height: '40px',
                  transition: 'box-shadow 0.3s',
                  boxShadow: isProfileHovered ? '0 0 10px 5px white' : 'none',
                }}
              />
            </span>
            {showUserMenu && (
              <Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onClickUserProfile}>
                <ProfileModal>
                  <img
                    src={gravatar.url(userinfo.nickname, { s: '36px', d: 'retro' })}
                    alt={userinfo.nickname}
                    style={{ borderRadius: '20%', width: '40px', height: '40px' }}
                  />
                  <div>
                    <span id='profile-name'>{userinfo.nickname}</span>
                    <span id='profile-active'>Active</span>
                  </div>
                </ProfileModal>
                <LogOutButton onClick={onLogOut}>나가기</LogOutButton>
              </Menu>
            )}
          </RightMenu>
        )}
      </Header>

      <WorkspaceWrapper>
        <Channels>
          <MenuScroll>
            <ChannelList roomData={roomData} setRoomData={setRoomData} onChannelClick={onChannelClick} />
          </MenuScroll>
        </Channels>

        <Chats>
          <MenuScroll>
            <ChannelTitleBox>
              <ChannelTitle>#{selectedChannel?.channel_description}</ChannelTitle>
            </ChannelTitleBox>

            {Object.entries(groupedRoomData).map(([date, chats]) => (
              <div key={date} style={{ marginBottom: '30px' }}>
                <h3
                  style={{
                    background: 'white',
                    color: 'gray',
                    borderRadius: '25px',
                    padding: '10px 10px',
                    display: 'block',
                    border: 'none',
                    fontSize: '12px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                    margin: '0 auto',
                    width: '20%',
                  }}
                  onClick={handleDateClick} // 날짜를 클릭하면 달력을 열도록 이벤트 핸들러 추가
                >
                  {date}
                </h3>
                <MyCalendar
                  isCalendarOpen={isCalendarOpen}
                  targetElement={targetElement}
                  onChange={handleSmallCalendarChange}
                  onClose={() => setIsCalendarOpen(false)}
                />

                {chats.map((data, idx) => {
                  const sentTime = new Date(data.sentTime);

                  if (Number.isNaN(sentTime.getTime())) {
                    console.error('Invalid date string:', data.sentTime);
                    return null;
                  }

                  // 날짜 포맷팅
                  const formattedSentTime = new Intl.DateTimeFormat('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                  }).format(sentTime);

                  return (
                    <div key={idx} style={{ display: 'flex', marginBottom: '30px', marginTop: '30px' }}>
                      {data.senderProfile && (
                        <img
                          src={data.senderProfile}
                          alt={`Profile of ${data.senderNickname}`}
                          style={{ borderRadius: '20%', width: '40px', height: '40px' }}
                        />
                      )}
                      {!data.senderProfile && (
                        <img
                          src={gravatar.url(data.senderNickname, { s: '40px', d: 'retro' })}
                          alt={`Profile of ${data.senderNickname}`}
                          style={{ borderRadius: '20%', width: '40px', height: '40px' }}
                        />
                      )}
                      <div style={{ marginLeft: '7px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span style={{ fontSize: '16px', fontWeight: 'bold', marginRight: '7px' }}>
                            {data.senderNickname}
                          </span>
                          <span style={{ color: 'lightgray', fontSize: '10px' }}>{formattedSentTime}</span>
                        </div>
                        <span>{data.content}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
            <ChatBox onSubmitForm={onSubmitForm} userData={userinfo} />
          </MenuScroll>
        </Chats>
      </WorkspaceWrapper>
    </>
  );
};

export default ChatRoom;
