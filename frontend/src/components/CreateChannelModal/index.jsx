import axios from 'axios';
import React, { useCallback } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import Modal from '../Modal/index';
import useInput from '../../hooks/useInput';
import { Button, Input, Label } from './style';
import fetcher from '../../utils/fetcher';

const CreateChannelModal = ({ show, onCloseModal, setShowCreateChannelModal }) => {
  const params = useParams();
  const { meetId } = params;
  const [newChannel, onChangeNewChannel, setNewChannel] = useInput('');
  const { data: userData } = useSWR('/api/users', fetcher);
  const { revalidate: revalidateChannel } = useSWR(userData ? `/chat/chatRoom/${meetId}/channels` : null, fetcher);

  const onCreateChannel = useCallback(
    (e) => {
      e.preventDefault();
      if (!newChannel || !newChannel.trim()) {
        return;
      }
      axios
        .post(`/api/workspaces/${meetId}/channels`, {
          name: newChannel,
        })
        .then(() => {
          revalidateChannel();
          setShowCreateChannelModal(false);
          setNewChannel('');
        })
        .catch((error) => {
          console.dir(error);
          toast.error(error.response?.data, { position: 'bottom-center' });
        });
    },
    [newChannel],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onCreateChannel}>
        <Label id='channel-label'>
          <span>채널 이름</span>
          <Input id='channel' value={newChannel} onChange={onChangeNewChannel} />
        </Label>
        <Button>생성하기</Button>
      </form>
    </Modal>
  );
};

export default CreateChannelModal;
