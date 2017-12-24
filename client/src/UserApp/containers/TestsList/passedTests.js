import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TestsList from './index.js';

const PassedTests = gql`
  query PassedTests($userId: String) {
    answersByStatusAndUserId(
      userId: $userId,
      status: "passed"
    ) {
      answer_id
      status_id
      test {
        test_id
        title
        description  
      }
	  }
  }
`;

const TestsListWithData = graphql(PassedTests, {
  options: {
    variables: {
      userId: window.localStorage.getItem('rr_userId'),
    },
  }
})(TestsList);

export default TestsListWithData;
