import gql from 'graphql-tag';

const fetchAllTests = gql`
  query AllTests {
    allTests {
      test_id
      title
      description
    }
  }
`;

export default fetchAllTests;
