import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TestsList from './index.js';

const AssessedTests = gql`
  query PassedTests {
    answersByStatusAndUserId(userId:"2", status:"assessed") {
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
  AssessedTests
)(TestsList);

export default TestsListWithData;
