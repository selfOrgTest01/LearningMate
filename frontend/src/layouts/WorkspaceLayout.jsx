import React from 'react';
import WorkspaceLayout from './WorkSpace/index';

const WorkspaceLayoutWrapper = ({ children }) => (
  <>
    <WorkspaceLayout />
    <div style={{ padding: '16px' }}>{children}</div>
    <WorkspaceLayout />
  </>
);

export default WorkspaceLayoutWrapper;