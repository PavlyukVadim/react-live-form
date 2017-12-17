import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TestsList from './index.js';

const PassedTests = gql`
  query PassedTests {
    answersByStatusAndUserId(userId:"1", status:"passed") {
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

const TestsListWithData = graphql(
  PassedTests
)(TestsList);

export default TestsListWithData;
