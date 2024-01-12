import { useCallback } from 'react';
import io from 'socket.io-client';

const backUrl = 'http://localhost:3000'; // process.env.NODE_ENV === 'production' ? 'https://sleact.nodebird.com' : 'http://localhost:3001';

const sockets = {};

const useSocket = (meetId) => {
  const disconnect = useCallback(() => {
    if (meetId && sockets[meetId]) {
      sockets[meetId].disconnect();
      delete sockets[meetId];
    }
  }, [meetId]);

  if (!meetId) {
    return [undefined, disconnect];
  }

  if (!sockets[meetId]) {
    sockets[meetId] = io.connect(`${backUrl}`, {
      path: `/ws-chatRoom/${meetId}`, // 서버의 네임스페이스 설정
      transports: ['websocket'],
    });
    console.info('create socket', meetId, sockets[meetId]);
  }

  return [sockets[meetId], disconnect];
};

export default useSocket;
