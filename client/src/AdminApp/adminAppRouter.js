import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './containers/Dashboard';
import TestConstructor from './containers/TestConstructor';
import PassedTest from './containers/PassedTest';
import PassedTestsList from './containers/TestsList/passedTests';

const AdminAppRouter = ({
  history,
}) => (
  <div>
    <Route
      path='/admin'
      exact
      render={
        (props) => (
          <Dashboard
            history={props.history}
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
            history={props.history}
            status="assessed"
          />
        )
      }
    />
  </div>
);

export default AdminAppRouter;
