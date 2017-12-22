import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import TestsList from './containers/TestsList';
import TestConstructor from './containers/TestConstructor';
import PassedTest from './containers/PassedTest';
import PassedTestsList from './containers/TestsList/passedTests';

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
      path='/admin/test/new'
      render={
        (props) => (
          <TestConstructor history={props.history} />
        )
      }
    />
    <Route
      path='/admin/passed'
      exact
      render={
        (props) => (
          <PassedTestsList
            history={history}
            subHeader="Tests that were pass"
          />
        )
      }
    />
    <Route
      path='/admin/passed/test/:id'
      render={
        (props) => (
          <PassedTest
            answerId={props.match.params.id}
            status="assessed"
          />
        )
      }
    />
  </div>
);

export default AdminAppRouter;
