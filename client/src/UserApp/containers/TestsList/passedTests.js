import { graphql } from 'react-apollo';
import TestsList from './index.js';
import PassedTests from './queries/fetchPassedTests';

const TestsListWithData = graphql(PassedTests, {
  options: {
    variables: {
      userId: window.localStorage.getItem('rr_userId'),
    },
  }
})(TestsList);

export default TestsListWithData;
