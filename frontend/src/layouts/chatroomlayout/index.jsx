/* eslint-disable no-console */
import axios from 'axios';
import gravatar from 'gravatar';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import ChannelList from '../../components/Channelist/index';
import CreateChannelModal from '../../components/CreateChannelModal/index';
// import DMList from '../../components/DMList/index';
import InviteWorkspaceModal from '../../components/InviteChannelModal/index';
import Menu from '../../components/Menu/index';
import Modal from '../../components/Modal/index';
import useInput from '../../hooks/useInput';
import DirectMessage from '../../pages/DirectMessage';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Input, Label } from './style2';
import TypingChat from '../../pages/Channel/index';
import ChatBox from '../../components/ChatBox/index';

import {
  AddButton,
  Channels,
  Chats,
  Header,
  LogOutButton,
  MenuScroll,
  ProfileImg,
  ProfileModal,
  RightMenu,
  WorkspaceButton,
  WorkspaceModal,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from './style';

const ChatRoom = () => {
  const { meetId, channelId } = useParams();
  const navigate = useNavigate();

  // redux meet 정보

  const [userData, setUserData] = useState(); // 사용자 정보 저장, 현재 로그인한 사용자의 닉네임, 이메일 등과 같은 정보를 담고 있음
  const [roomData, setRoomData] = useState([]); // 채팅 방에 대한 정보를 저장하는 상태
  const [chatData, setChatData] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [newChannel, onChangeNewChannel, setNewChannel] = useInput('');

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
  const [showInviteWorkspaceModal, setShowInviteWorkspaceModal] = useState(false);
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const [newWorkspace, setNewWorkspace] = useInput('');
  const [newUrl, setNewUrl] = useInput('');

  const getUserData = useCallback(async () => {
    try {
      const resp = await axios.get(`http://localhost:8000/users/list`);
      setUserData(resp.data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

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
        const resp = await axios.get(`http://localhost:8000/chat/chatRoom/${meetId}/channels/${channelId}`);
        setRoomData(resp.data.data.channelChatRoomData);
      }
    } catch (error) {
      console.error(error);
    }
  }, [meetId, channelId]);

  useEffect(() => {
    const pollingInterval = setInterval(() => {
      getChatData();
    }, 2000); // 풀링 주기에 따라 데이터 2초마다 갱신

    return () => clearInterval(pollingInterval); // 컴포넌트 언마운트 시에 clearInterval
  }, [channelId, meetId, getChatData]);

  useEffect(() => {
    getUserData();
    getChatData(); // 초기 로딩 시에도 채팅 내용을 가져옴
  }, [getUserData, getChatData]);

  const onSubmitForm = (e) => {
    e.preventDefault();
    // Handle form submission logic here if needed
  };

  // useEffect(() => {
  //   if (channelId) {
  //     getChatData();
  //   }
  // }, [getChatData, channelId]);

  const onLogOut = useCallback(async () => {
    try {
      await axios.get(`http://localhost:8000/users/logout`);
      navigate('/');
    } catch (error) {
      console.dir(error);
      toast.error(error.response?.data, { position: 'bottom-center' });
    }
  }, [navigate]);

  const onClickCreateWorkspace = useCallback(() => {
    setShowCreateWorkspaceModal(true);
  }, []);

  const onClickAddChannel = useCallback(() => {
    setShowCreateChannelModal(true);
  }, []);

  const onClickInviteWorkspace = useCallback(() => {
    setShowInviteWorkspaceModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowCreateWorkspaceModal(false);
    setShowCreateChannelModal(false);
    setShowInviteWorkspaceModal(false);
  }, []);

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);

  const toggleWorkspaceModal = useCallback(() => {
    setShowWorkspaceModal((prev) => !prev);
  }, []);

  return (
    <>
      <Header>
        {userData && (
          <RightMenu>
            <span onClick={onClickUserProfile}>
              <ProfileImg src={gravatar.url(userData.nickname, { s: '28px', d: 'retro' })} alt={userData.nickname} />
            </span>
            {showUserMenu && (
              <Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onClickUserProfile}>
                <ProfileModal>
                  <img src={gravatar.url(userData.nickname, { s: '36px', d: 'retro' })} alt={userData.nickname} />
                  <div>
                    <span id='profile-name'>{userData.nickname}</span>
                    <span id='profile-active'>Active</span>
                  </div>
                </ProfileModal>
                <LogOutButton onClick={onLogOut}>로그아웃</LogOutButton>
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
            {roomData.map((data, idx) => (
              <div key={idx}>
                {data.senderNickname}
                <br />
                {data.content}
                <br />
                <span style={{ color: 'lightgray', fontSize: '10px' }}>{data.sentTime}</span>
                <br />
                <br />
              </div>
            ))}
            <ChatBox onSubmitForm={onSubmitForm} />
          </MenuScroll>
        </Chats>
      </WorkspaceWrapper>
    </>
  );
};

export default ChatRoom;
