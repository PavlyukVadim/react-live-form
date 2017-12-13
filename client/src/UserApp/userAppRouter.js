import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import TestsList from './containers/TestsList';
import TestPage from './containers/TestPage';
import formConfig from './containers/TestPage/formConfig';

const UserAppRouter = ({
  history,
  match,
}) => (
  <div>
    <Route
      path='/user'
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
      path='/user/test/:id'
      render={
        () => (
          <TestPage 
            formConfig={formConfig}
          />
        )
      }
    />
  </div>
);

export default UserAppRouter;
