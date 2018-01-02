import gql from 'graphql-tag';

const fetchPassedTests = gql`
  query PassedTests($userId: String) {
    answersByStatusAndUserId(
      userId: $userId,
      status: "passed"
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

export default fetchPassedTests;
