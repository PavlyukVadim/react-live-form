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
    const currentPath = this.props.path;
    const path = `${currentPath}/test/${id}`;
    this.props.history.push(path);
  }

  render() {
    return (
      <div>
        <List selectable ripple>
          <ListSubHeader caption="Tests that you can pass" />
            {
              tests.map((test) => {
                return (
                  <ListItem
                    key={test.id}
                    avatar=''
                    caption={test.name}
                    legend={test.description}
                    onClick={() => this.goToTestPage(test.id)}
                  />
                );
              })
            }
        </List>
      </div>
    );
  }
}

export default TestsList;
