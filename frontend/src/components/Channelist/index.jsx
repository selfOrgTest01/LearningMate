import React, { useCallback, useEffect, useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import CollapseButton from '../DMList/style';
import CreateChannelModal from '../CreateChannelModal/index';

const ChannelList = (props) => {
  const { roomData, setRoomData, onChannelClick, getChatData } = props;

  const { meetId } = useParams();
  const location = useLocation();

  const [channelCollapse, setChannelCollapse] = useState(false);
  const [countList, setCountList] = useState({});
  const [chatRoomInfo, setChatRoomInfo] = useState(null);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);

  const getRoomData = useCallback(async () => {
    try {
      const resp = await axios.get(`http://localhost:8000/chat/chatRoom/${meetId}`);
      console.log('aaa', resp.data.data.initialRoom);
      setRoomData(resp.data.data.initialRoom);
    } catch (error) {
      console.error(error);
    }
  }, [meetId, setRoomData]);

  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);

  const resetCount = useCallback(
    (id) => () => {
      setCountList((list) => ({
        ...list,
        [id]: undefined,
      }));
    },
    [],
  );

  const openCreateChannelModal = useCallback(() => {
    setShowCreateChannelModal(true);
  }, []);

  const closeCreateChannelModal = useCallback(() => {
    setShowCreateChannelModal(false);
  }, []);

  useEffect(() => {
    getRoomData();
  }, [getRoomData]);

  useEffect(() => {
    if (meetId && location.pathname) {
      console.log('ChannelList: channelId 바꼈다 meetId:', meetId, location.pathname);
      setCountList({});
    }
  }, [meetId, location]);

  const onMessage = (data) => {
    console.log('message 왔다', data);
    // 새로운 메시지가 도착할 때 화면을 갱신하는 로직 추가
    getChatData();
  };

  const fetchChannelList = async () => {
    try {
      const response = await fetch(`http://localhost:8000/chat/channels/${meetId}`);
      const data = await response.json();
      if (response.ok) {
        setChatRoomInfo(data.data);
      } else {
        console.error('Failed to fetch channel list:', data.message);
      }
    } catch (error) {
      console.error('Error fetching channel list:', error.message);
    }
  };

  const handleChannelClick = useCallback(
    async (channel) => {
      try {
        const response = await axios.get(
          `http://localhost:8000/chat/chatRoom/${meetId}/channels/${channel.channel_id}}`,
        );
        const chatRoomData = response.data.data.channelRoom;
        console.log('ddddd', chatRoomData);
        setRoomData(chatRoomData);
        onChannelClick(channel);
      } catch (error) {
        console.error(error);
      }
    },
    [meetId, setRoomData, onChannelClick],
  );

  useEffect(() => {
    fetchChannelList();
  }, [meetId]);

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
        <button
          onClick={openCreateChannelModal}
          style={{
            border: 'none',
            borderRadius: '1px',
            padding: '2px 8px',
            background: 'transparent', // 배경을 투명하게
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          +
        </button>
      </h2>
      <div>
        {!channelCollapse &&
          chatRoomInfo?.channelList?.map((channel) => {
            const count = countList[`c-${channel.channel_description}`];
            return (
              <React.Fragment key={channel.channel_id}>
                <NavLink
                  to={`/chat/chatRoom/${meetId}/channels/${channel.channel_id}`}
                  onClick={() => {
                    resetCount(`c-${channel.channel_id}`)();
                    onChannelClick(channel);
                  }}
                >
                  <span className={count !== undefined && count >= 0 ? 'bold' : undefined}>
                    # {channel.channel_description}
                  </span>
                  {count !== undefined && count > 0 && <span className='count'>{count}</span>}
                </NavLink>
              </React.Fragment>
            );
          })}

        <CreateChannelModal
          show={showCreateChannelModal}
          onCloseModal={closeCreateChannelModal}
          onChannelCreated={(newChannel) => {
            // Handle the creation of the new channel, if needed
            // For example, you can update the channel list or perform other actions
            console.log('New Channel Created:', newChannel);
            closeCreateChannelModal();
          }}
        />
      </div>
    </>
  );
};

export default ChannelList;
