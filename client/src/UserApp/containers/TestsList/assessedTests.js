import { graphql } from 'react-apollo';
import AssessedTests from './queries/fetchAssessedTests';
import TestsList from './index.js';

const TestsListWithData = graphql(AssessedTests, {
  options: {
    variables: {
      userId: window.localStorage.getItem('rr_userId'),
    },
    fetchPolicy: 'network-only',
  }
})(TestsList);

export default TestsListWithData;
