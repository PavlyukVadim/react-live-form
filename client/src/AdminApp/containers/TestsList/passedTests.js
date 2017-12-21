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
      test {
        title
        description
      }
      comment {
        comment_id
        content
      }
    }
  }
`;

const TestsListWithData = graphql(
  PassedTests
)(TestsList);

export default TestsListWithData;
