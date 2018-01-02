import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import AvailableTests from './containers/TestsLists/AvailableTests';
import PassedTestsList from './containers/TestsList/passedTests';
import AssessedTestsList from './containers/TestsList/assessedTests';

import NewTest from './containers/NewTest';
import PassedTest from './containers/PassedTest';
import AssessedTest from './containers/AssessedTest';

const UserAppRouter = () => (
  <div>
    <Route
      path='/user'
      exact
      render={
        (props) => (
          <AvailableTests
            history={props.history}
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
        (props) => (
          <PassedTestsList
            history={props.history}
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
        (props) => (
          <AssessedTestsList
            history={props.history}
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
