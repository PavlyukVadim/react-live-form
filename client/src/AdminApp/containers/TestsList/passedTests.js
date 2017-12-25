import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TestsList from './index.js';

const PassedTests = gql`
  query PassedTests {
    passedAnswers: answersByStatus(status: "passed") {
      answer_id
      status_id
      form_answers
      passage_date
      user {
        name
      }
      test {
        title
        description
      }
    }
    
    assessedAnswers: answersByStatus(status: "assessed") {
      answer_id
      status_id
      form_answers
      passage_date
      user {
        name
      }
      test {
        title
        description
      }
    }
  }
`;

const TestsListWithData = graphql(PassedTests, {
  options: {
    fetchPolicy: 'network-only',
  }
})(TestsList);

export default TestsListWithData;
