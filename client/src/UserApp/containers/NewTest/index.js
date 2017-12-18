import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import TestPage from './../TestPage';

const TestById = gql`
  query TestById {
    testById(id:"1") {
      test_id
      title
      description
      formConfig
    }
  }
`;

const AddAnswerByUser = gql`
  mutation AddAnswerByUser(
    $testId: String!,
    $userId: String!,
    $formAnswers: JSON!,
    $statusId: String!
  ) {
    AddAnswerByUser(
      testId: $testId,
      userId: $userId,
      formAnswers: $formAnswers,
      statusId: $statusId
    ) {
      answer_id
      status_id
      form_answers
    }
  }
`;

const withTestById = graphql(TestById);
const withAddAnswers = graphql(AddAnswerByUser);

const TestPageWithData = compose(
  withTestById,
  withAddAnswers,
)(TestPage);

export default TestPageWithData;
