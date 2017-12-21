import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import TestsList from './containers/TestsList';
import TestConstructor from './containers/TestConstructor';

const AdminAppRouter = ({
  history,
  match,
}) => (
  <div>
    <Route
      path='/admin'
      exact
      render={
        () => (
          <TestsList 
            history={history}
            path={match.path}
          />
        )
      }
    />
    <Route
      path='/admin/test/:id'
      render={
        (props) => (
          <TestConstructor history={props.history} />
        )
      }
    />
    <Route
      path='/admin/test/new'
      render={
        () => (
          <CreateTest />
        )
      }
    />
  </div>
);

export default AdminAppRouter;
