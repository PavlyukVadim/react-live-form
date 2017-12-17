import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {
  List,
  ListItem,
  ListSubHeader,
  ListCheckbox
} from 'react-toolbox/lib/list';

class TestsList extends Component {
  constructor(props) {
    super(props);
    this.goToTestPage = this.goToTestPage.bind(this);
  }

  goToTestPage(id) {
    const newPath = `${this.props.history.location.pathname}/test/${id}`;
    this.props.history.push(newPath);
  }

  render() {
    const {
      subHeader,
      data,
    } = this.props;

    if (data.error) {
      return(
        <div>error</div>
      );
    }

    const tests = data.allTests || [];
    const TestItems = tests.map((test) => {
      return (
        <ListItem
          key={test.test_id}
          avatar=""
          caption={test.title}
          legend={test.description}
          onClick={() => this.goToTestPage(test.test_id)}
        />
      );
    });

    return (
      <div>
        <List selectable ripple>
          <ListSubHeader caption={subHeader} />
          {TestItems}
        </List>
      </div>
    );
  }
}

// export default TestsList;

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
