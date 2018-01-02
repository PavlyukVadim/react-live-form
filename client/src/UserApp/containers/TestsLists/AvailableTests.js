import React from 'react';
import { graphql } from 'react-apollo';
import AllTestsQuery from './queries/fetchAllTests';
import TestsList from './../../../App/containers/TestsList';

const AvailableTests = ({
  data,
  history,
  subHeader,
}) => {
  let tests = [];
  let error = false;
  if (data && data.error) {
    error = true;
  } else if (data.allTests) {
    tests = data.allTests.map((e) => {
      const test = Object.assign({}, e);
      test.link = e.test_id;
      test.icon = 'add_box';
      test.legend = test.title;
      return test;
    }); 
  }

  return (
    <TestsList
      history={history}
      subHeader={subHeader}
      tests={tests}
      error={error}
    />
  );
};

const TestsListWithData = graphql(AllTestsQuery)(AvailableTests);

export default TestsListWithData;
