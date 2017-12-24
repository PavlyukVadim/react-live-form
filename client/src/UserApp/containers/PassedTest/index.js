import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TestPage from './../TestPage';

const AnswerById = gql`
  query AnswerById($answerId: String!) {
    answerById(id: $answerId) {
      answer_id
      status_id
      form_answers
      test {
        test_id
        title
        description
        formConfig
      }
    }
  }
`;

const TestPageWithData = graphql(
  AnswerById, {
    options: ({ answerId }) => ({ variables: { answerId } }),
  }
)(TestPage);

export default TestPageWithData;
