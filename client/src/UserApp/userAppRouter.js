import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import AllTestsList from './containers/TestsList/allTests';
import PassedTestsList from './containers/TestsList/passedTests';
import AssessedTestsList from './containers/TestsList/assessedTests';

import NewTest from './containers/NewTest';
import PassedTest from './containers/PassedTest';
import AssessedTest from './containers/AssessedTest';

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
          <AllTestsList
            history={history}
            subHeader="Tests that you can pass"
          />
        )
      }
    />
    <Route
      path='/user/test/:id'
      render={
        (props) => (
          <NewTest
            status="new"
            history={props.history}
            testId={props.match.params.id}
          />
        )
      }
    />
    <Route
      path='/user/passed'
      exact
      render={
        () => (
          <PassedTestsList
            history={history}
            subHeader="Tests that you passed"
          />
        )
      }
    />
    <Route
      path='/user/passed/test/:id'
      render={
        (props) => (
          <PassedTest
            answerId={props.match.params.id}
            status="passed"
          />
        )
      }
    />
    <Route
      path='/user/assessed'
      exact
      render={
        () => (
          <AssessedTestsList
            history={history}
            subHeader="Tests that have assessment"
          />
        )
      }
    />
    <Route
      path='/user/assessed/test/:id'
      render={
        (props) => (
          <AssessedTest
            answerId={props.match.params.id}
            status="assessed"
          />
        )
      }
    />
  </div>
);

export default UserAppRouter;
