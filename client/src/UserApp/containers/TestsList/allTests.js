import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TestsList from './index.js';

const AllTests = gql`
  query AllTests {
    allTests {
    test_id
    title
    description
  }
}
`;

const TestsListWithData = graphql(AllTests)(TestsList);

export default TestsListWithData;
