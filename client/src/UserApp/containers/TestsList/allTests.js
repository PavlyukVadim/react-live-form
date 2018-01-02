import { graphql } from 'react-apollo';
import AllTests from './queries/fetchAllTests';
import TestsList from './index.js';

const TestsListWithData = graphql(AllTests)(TestsList);

export default TestsListWithData;
