import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

const Workspace = loadable(() => import('../WorkSpace/index'));

const WorkSpaces = () => {
  return (
    <Route path="/Workspace">
      <Workspace />
    </Route>
  );
};

export default WorkSpaces;