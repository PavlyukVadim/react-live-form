import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import TestsList from './containers/TestsList';
import TestPage from './containers/TestPage';
import formConfig from './containers/TestPage/formConfig';
import answers from './containers/TestPage/answers';

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
            subHeader="Tests that you can pass"
          />
        )
      }
    />
    <Route
      path='/user/passed'
      exact
      render={
        () => (
          <TestsList
            history={history}
            subHeader="Tests that you passed"
          />
        )
      }
    />
    <Route
      path='/user/assessed'
      exact
      render={
        () => (
          <TestsList
            history={history}
            subHeader="Tests that have assessment"
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
            status="new"
          />
        )
      }
    />
    <Route
      path='/user/passed/test/:id'
      render={
        () => (
          <TestPage
            formConfig={formConfig}
            answers={answers}
            status="passed"
          />
        )
      }
    />
  </div>
);

export default UserAppRouter;
