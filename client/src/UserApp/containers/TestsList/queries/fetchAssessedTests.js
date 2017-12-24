import gql from 'graphql-tag';

const fetchAssessedTests = gql`
  query PassedTests($userId: String) {
    answersByStatusAndUserId(
      userId: $userId,
      status: "assessed"
    ) {
      answer_id
      status_id
      passage_date
      test {
        test_id
        title
        description  
      }
    }
  }
`;

export default fetchAssessedTests;
