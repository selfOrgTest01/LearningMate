// 채팅방 정보를 가져오고 해당 정보를 활용하여 채널 목록을 표시하는 역할을 함.
/* eslint-disable no-console */
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import useSWR from 'swr';
import { CollapseButton } from '../DMList/style';
import useSocket from '../../hooks/useSocket';
import fetcher from '../../utils/fetcher';

const ChannelList = () => {
  const { workspace } = useParams();
  const location = useLocation();
  const { data: userData } = useSWR('/api/users', fetcher, {
    dedupingInterval: 2000, // 2초
  });
  const [socket] = useSocket(workspace);
  const [channelCollapse, setChannelCollapse] = useState(false);
  const [countList, setCountList] = useState({});
  const [chatRoomInfo, setChatRoomInfo] = useState(null);

  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);

  const resetCount = useCallback(
    (id) => () => {
      setCountList((list) => {
        return {
          ...list,
          [id]: undefined,
        };
      });
    },
    [],
  );

  useEffect(() => {
    console.log('ChannelList: workspace 바꼈다', workspace, location.pathname);
    setCountList({});
  }, [workspace, location]);

  const onMessage = (data) => {
    console.log('message 왔다', data);
    const mentions = data.content.match(/@\[(.+?)]\((\d)\)/g);
    if (mentions?.find((v) => v.match(/@\[(.+?)]\((\d)\)/)[2] === userData?.id.toString())) {
      setCountList((list) => ({
        ...list,
        [`c-${data.ChannelId}`]: (list[`c-${data.ChannelId}`] || 0) + 1,
      }));
    } else {
      setCountList((list) => ({
        ...list,
        [`c-${data.ChannelId}`]: list[`c-${data.ChannelId}`] || 0,
      }));
    }
  };

  useEffect(() => {
    socket?.on('message', onMessage);
    console.log('socket on message', socket?.hasListeners('message'));
    return () => {
      socket?.off('message', onMessage);
      console.log('socket off message', socket?.hasListeners('message'));
    };
  }, [socket]);

  // Function to fetch chat room information from the server
  const fetchChatRoomInfo = async () => {
    try {
      const response = await fetch(`/api/participants/chatroom-info/${workspace}`);
      const data = await response.json();
      if (response.ok) {
        setChatRoomInfo(data.data);
      } else {
        console.error('Failed to fetch chat room information:', data.message);
      }
    } catch (error) {
      console.error('Error fetching chat room information:', error.message);
    }
  };

  useEffect(() => {
    // Fetch chat room information when the component mounts
    fetchChatRoomInfo();
  }, [workspace]);

  return (
    <>
      <h2>
        <CollapseButton collapse={channelCollapse} onClick={toggleChannelCollapse}>
          <i
            className='c-icon p-channel_sidebar__section_heading_expand p-channel_sidebar__section_heading_expand--show_more_feature c-icon--caret-right c-icon--inherit c-icon--inline'
            data-qa='channel-section-collapse'
            aria-hidden='true'
          />
        </CollapseButton>
        <span>Channels</span>
      </h2>
      <div>
        {!channelCollapse &&
          chatRoomInfo?.channelList?.map((channel) => {
            const count = countList[`c-${channel.channel_id}`];
            return (
              <NavLink
                key={channel.channel_id}
                activeClassName='selected'
                to={`/workspace/${workspace}/channel/${channel.channel_description}`}
                onClick={resetCount(`c-${channel.channel_id}`)}
              >
                <span className={count !== undefined && count >= 0 ? 'bold' : undefined}>
                  # {channel.channel_description}
                </span>
                {count !== undefined && count > 0 && <span className='count'>{count}</span>}
              </NavLink>
            );
          })}
      </div>
    </>
  );
};

export default ChannelList;
