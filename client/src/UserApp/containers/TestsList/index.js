import React, { Component } from 'react';
import {
  List,
  ListItem,
  ListSubHeader,
  ListCheckbox
} from 'react-toolbox/lib/list';

const tests = [
  {
    id: 1,
    name: 'testName#1',
    description: 'description of test 1'
  },
  {
    id: 2,
    name: 'testName#2',
    description: 'description of test 2'
  },
  {
    id: 3,
    name: 'testName#3',
    description: 'description of test 3'
  }
];

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
    } = this.props;

    console.log('props', this.props);

    const TestItems = tests.map((test) => {
      return (
        <ListItem
          key={test.id}
          avatar=""
          caption={test.name}
          legend={test.description}
          onClick={() => this.goToTestPage(test.id)}
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

export default TestsList;
