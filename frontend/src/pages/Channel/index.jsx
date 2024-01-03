
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ChatBox from '../../components/ChatBox/index';
import ChatList from '../../components/ChatList/index';
import InviteChannelModal from '../../components/InviteChannelModal/index';
import useInput from '../../hooks/useInput';
import useSocket from '../../hooks/useSocket';
import { Header, Container } from './sytle';
import fetcher from '../../utils/fetcher';
import makeSection from '../../utils/makeSection';
import axios from 'axios';
import { useParams, Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

const PAGE_SIZE = 20;

const scrollToBottomIfNeeded = (scrollbarRef) => {
  if (scrollbarRef.current) {
    const { scrollHeight, clientHeight, scrollTop } = scrollbarRef.current.getValues();
    if (scrollHeight < clientHeight + scrollTop + 150) {
      console.log('scrollToBottom!', scrollbarRef.current?.getValues());
      scrollbarRef.current.scrollToBottom();
    }
  }
};

const handleApiError = (error) => {
  console.error('API Error:', error);
  // 필요한 오류 처리 로직을 추가하세요.
};

const Channel = () => {
  const { workspace, channel } = useParams();
  const [socket] = useSocket(workspace);
  const { data: userData } = useSWR('/api/users', fetcher);
  const { data: channelsData } = useSWR(`/api/workspaces/${workspace}/channels`, fetcher);
  const channelData = channelsData?.find((v) => v.name === channel);
  const { data: chatData, mutate: mutateChat, setSize } = useSWRInfinite(
    (index) => `/api/workspaces/${workspace}/channels/${channel}/chats?perPage=${PAGE_SIZE}&page=${index + 1}`,
    fetcher,
  );
  const { data: channelMembersData } = useSWR(
    userData ? `/api/workspaces/${workspace}/channels/${channel}/members` : null,
    fetcher,
  );
  const [chat, onChangeChat, setChat] = useInput('');
  const [showInviteChannelModal, setShowInviteChannelModal] = useState(false);
  const scrollbarRef = useRef(null);

  const isEmpty = chatData?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (chatData && chatData[chatData.length - 1]?.length < PAGE_SIZE);

  const onCloseModal = useCallback(() => {
    setShowInviteChannelModal(false);
  }, []);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (chat?.trim() && chatData && channelData && userData) {
        const savedChat = chat;
        mutateChat((prevChatData) => {
          prevChatData?.[0].unshift({
            id: (chatData[0][0]?.id || 0) + 1,
            content: savedChat,
            UserId: userData.id,
            User: userData,
            createdAt: new Date(),
            ChannelId: channelData.id,
            Channel: channelData,
          });
          return prevChatData;
        }, false).then(() => {
          setChat('');
          scrollToBottomIfNeeded(scrollbarRef);
        });
        axios
          .post(`/api/workspaces/${workspace}/channels/${channel}/chats`, {
            content: savedChat,
          })
          .catch(handleApiError);
      }
    },
    [chat, workspace, channel, channelData, userData, chatData],
  );

  const onMessage = (data) => {
    if (data.Channel.name === channel && data.UserId !== userData?.id) {
      mutateChat((chatData) => {
        chatData?.[0].unshift(data);
        return chatData;
      }, false).then(() => {
        scrollToBottomIfNeeded(scrollbarRef);
      });
    }
  };

  useEffect(() => {
    socket?.on('message', onMessage);
    return () => {
      socket?.off('message', onMessage);
    };
  }, [socket, userData]);

  useEffect(() => {
    if (chatData?.length === 1) {
      console.log('toBottomWhenLoaded', chatData, scrollbarRef.current?.getValues());
      scrollToBottomIfNeeded(scrollbarRef);
    }
  }, [chatData]);

  const onClickInviteChannel = useCallback(() => {
    setShowInviteChannelModal(true);
  }, []);

  if (channelsData && !channelData) {
    return <Navigate to={`/workspace/${workspace}/channel/일반`} replace />;
  }

  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);

  console.log('channelsData:', channelsData);
  console.log('channelData:', channelData);

  return (
    <Container>
      <Header>
        <span>#{channel}</span>
        <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <span>{channelMembersData?.length}</span>
          <button
            onClick={onClickInviteChannel}
            className="c-button-unstyled p-ia__view_header__button"
            aria-label="Add people to #react-native"
            data-sk="tooltip_parent"
            type="button"
          >
            <i className="c-icon p-ia__view_header__button_icon c-icon--add-user" aria-hidden="true" />
          </button>
        </div>
      </Header>
      {/* Layout 제거 */}
      <ChatList scrollbarRef={scrollbarRef} isReachingEnd={isReachingEnd} isEmpty={isEmpty} chatSections={chatSections} setSize={setSize} />
      <ChatBox onSubmitForm={onSubmitForm} chat={chat} onChangeChat={onChangeChat} placeholder={`Message #${channel}`} data={channelMembersData} />
      <InviteChannelModal show={showInviteChannelModal} onCloseModal={onCloseModal} setShowInviteChannelModal={setShowInviteChannelModal} />
      <ToastContainer position="bottom-center" />
    </Container>
  );
};

export default Channel;

