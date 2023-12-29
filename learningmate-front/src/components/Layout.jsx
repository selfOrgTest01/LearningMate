import React from 'react';
import WorkSpaces from '../layouts/App/App';

const Layout = ({ children }) => {
  return (
    <div>
      <WorkSpaces />
      {children}
      <WorkSpaces />
    </div>
  );
};

export default Layout;