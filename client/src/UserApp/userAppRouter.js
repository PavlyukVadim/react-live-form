import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import TestsList from './containers/TestsList';
import AllTestsList from './containers/TestsList/allTests';
import PassedTestsList from './containers/TestsList/passedTests';
import TestPage from './containers/TestPage';
import NewTest from './containers/NewTest';
import PassedTest from './containers/PassedTest';
import formConfig from './containers/TestPage/formConfig';
import answers from './containers/TestPage/answers';
import comment from './containers/TestPage/comment';

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
        () => (
          <NewTest
            status="new"
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
          <TestsList
            history={history}
            subHeader="Tests that have assessment"
          />
        )
      }
    />
    <Route
      path='/user/assessed/test/:id'
      render={
        () => (
          <TestPage
            formConfig={formConfig}
            answers={answers}
            comment={comment}
            status="assessed"
          />
        )
      }
    />
  </div>
);

export default UserAppRouter;
