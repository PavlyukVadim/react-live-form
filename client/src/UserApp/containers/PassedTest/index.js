import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TestPage from './../TestPage';

const TestById = gql`
  query TestById {
    answerById(id:"1") {
      answer_id
      status_id
      test_id
      form_answers
    }

    testById(id:"1") {
      test_id
      title
      description
      formConfig
    }
  }
`;

const TestPageWithData = graphql(TestById)(TestPage);

export default TestPageWithData;
