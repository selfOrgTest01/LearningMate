import React, { useCallback, useEffect, useState } from 'react';
import { useParams, Link, Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import { gravatar } from 'gravatar';
import { Header, RightMenu, ProfileImg, WorkspaceWrapper, Workspaces, WorkspaceButton, AddButton } from './style';
import ChannelList from '../../components/ChatList/index';
import DMList from '../../components/DMList/index';

const Workspace = () => {
  const params = useParams();
  const { workspace } = params;
  const navigate = useNavigate();

  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);

  const toggleWorkspaceModal = useCallback(() => {
    setShowWorkspaceModal((prev) => !prev);
  }, []);

  useEffect(() => {
    // 여기에 필요한 초기화 로직을 추가할 수 있습니다.
  }, []);

  return (
    <div>
      <Header>
        <RightMenu>
          <span>
            {/* 로그인된 사용자의 정보를 표시 */}
            <ProfileImg src={gravatar.url('example@example.com', { s: '28px', d: 'retro' })} alt="User" />
          </span>
        </RightMenu>
      </Header>
      <WorkspaceWrapper>
        <Workspaces>
          {/* Workspaces 링크들 */}
          <Link to={`/workspace/example/channel/일반`}>
            <WorkspaceButton>E</WorkspaceButton>
          </Link>
          <AddButton>+</AddButton>
        </Workspaces>
        <Outlet />
      </WorkspaceWrapper>
    </div>
  );
};

const WorkspaceRoutes = () => {
  return (
    <Routes>
      <Route path="channel/:channel" element={<ChannelList />} />
      <Route path="dm/:id" element={<DMList />} />
    </Routes>
  );
};

export { Workspace, WorkspaceRoutes };