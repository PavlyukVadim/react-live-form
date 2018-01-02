import React from 'react';
import { graphql } from 'react-apollo';
import TestsList from './../../../App/containers/TestsList';
import PassedTestsQuery from './queries/fetchPassedTests';
import timeAgoEnglish from './../../../utils/TimeAgoEnglish';

const AssessedTests = ({
  data,
  history,
  subHeader,
}) => {
  let tests = [];
  let error = false;
  if (data && data.error) {
    error = true;
  } else if (data.answersByStatusAndUserId) {
    tests = data.answersByStatusAndUserId.map((e) => {
      const test = Object.assign({}, e.test);
      test.link = e.answer_id;
      test.icon = 'undo';
      test.legend = timeAgoEnglish.format(new Date(e.passage_date));
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

const TestsListWithData = graphql(PassedTestsQuery, {
  options: {
    variables: {
      userId: window.localStorage.getItem('rr_userId'),
    },
    fetchPolicy: 'network-only',
  }
})(AssessedTests);

export default TestsListWithData;
