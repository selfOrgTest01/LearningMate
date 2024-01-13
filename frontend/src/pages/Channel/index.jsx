/* eslint-disable no-console */
// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import { useParams, Navigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import useSWR from 'swr';
// import useSWRInfinite from 'swr/infinite';
// import ChatBox from '../../components/ChatBox/index';
// import ChatList from '../../components/ChatList/index';
// import InviteChannelModal from '../../components/InviteChannelModal/index';
// import useInput from '../../hooks/useInput';
// // import useSocket from '../../hooks/useSocket';
// import { Header, Container } from './sytle';
// import fetcher from '../../utils/fetcher';
// import makeSection from '../../utils/makeSection';

// const PAGE_SIZE = 20;

// const scrollToBottomIfNeeded = (scrollbarRef) => {
//   if (scrollbarRef.current) {
//     const { scrollHeight, clientHeight, scrollTop } = scrollbarRef.current.getValues();
//     if (scrollHeight < clientHeight + scrollTop + 150) {
//       console.log('scrollToBottom!', scrollbarRef.current?.getValues());
//       scrollbarRef.current.scrollToBottom();
//     }
//   }
// };

// const handleApiError = (error) => {
//   console.error('API Error:', error);
//   // 필요한 오류 처리 로직을 추가
// };

// const Channel = () => {
//   // URL 파라미터에서 meetId와 channelId 추출
//   const { meetId, channelId } = useParams();

//   // 소켓 및 사용자 정보 불러오기
//   const [socket] = useSocket(meetId);
//   const { data: userData } = useSWR(`http://localhost:8000/users/list`, fetcher);

//   // 채널 및 참가자 정보 불러오기
//   const { data: channelsData } = useSWR(`http://localhost:8000/chat/channels/${meetId}`, fetcher);
//   const { data: channelMembersData } = useSWR(
//     userData ? `http://localhost:8000/chat/chatRoom/${meetId}` : null,
//     fetcher,
//   );
//   const participantList = channelMembersData.data.participantList || [];

//   // 채팅 데이터 불러오기 및 관련 상태 및 함수 정의
//   const {
//     data: chatData,
//     mutate: mutateChat,
//     setSize,
//   } = useSWRInfinite(
//     (index) => `http://localhost:8000/chat/chatRoom/${meetId}/chats?perPage=${PAGE_SIZE}&page=${index + 1}`,
//     fetcher,
//   );
//   const [chat, onChangeChat, setChat] = useInput('');

//   // 기타 상태 및 함수 정의
//   const [showInviteChannelModal, setShowInviteChannelModal] = useState(false);
//   const scrollbarRef = useRef(null);

//   // 채팅 전송 폼 제출 이벤트 핸들러
//   const onSubmitForm = useCallback(
//     (e) => {
//       e.preventDefault();
//       if (chat?.trim() && chatData && channelsData && userData) {
//         const savedChat = chat;
//         mutateChat((prevChatData) => {
//           prevChatData?.[0].unshift({
//             id: (chatData[0][0]?.user_id || 0) + 1,
//             content: savedChat,
//             UserId: userData.user_id,
//             User: userData,
//             createdAt: new Date(),
//             ChannelId: channelsData.channel_id,
//             Channel: channelsData.channel_description,
//           });
//           return prevChatData;
//         }, false).then(() => {
//           setChat('');
//           scrollToBottomIfNeeded(scrollbarRef);
//         });
//         axios
//           .post(`localhost:8000/chat/sendMessage/${meetId}`, {
//             content: savedChat,
//           })
//           .catch(handleApiError);
//       }
//     },
//     [chat, channelId, channelsData, userData, chatData],
//   );

//   // 새 메시지 도착 시 이벤트 핸들러
//   const onMessage = (data) => {
//     if (data.Channel.description === channelId && data.user_id !== userData?.id) {
//       mutateChat((newchatData) => {
//         newchatData?.[0].unshift(data);
//         return newchatData;
//       }, false).then(() => {
//         scrollToBottomIfNeeded(scrollbarRef);
//       });
//     }
//   };

//   // 소켓 이벤트 등록 및 해제
//   useEffect(() => {
//     socket?.on('message', onMessage);
//     return () => {
//       socket?.off('message', onMessage);
//     };
//   }, [socket, userData]);

//   // 채팅 데이터 로드 완료 시 하단으로 스크롤 이동
//   useEffect(() => {
//     if (chatData?.length === 1) {
//       console.log('toBottomWhenLoaded', chatData, scrollbarRef.current?.getValues());
//       scrollToBottomIfNeeded(scrollbarRef);
//     }
//   }, [chatData]);

//   // 초대 모달 열기 이벤트 핸들러
//   const onClickInviteChannel = useCallback(() => {
//     setShowInviteChannelModal(true);
//   }, []);

//   // 필요한 로직 추가
//   // ...

//   // 컴포넌트 JSX 반환
//   return <Container>{/* 필요한 JSX 구조 추가 */}</Container>;
// };

// export default Channel;
