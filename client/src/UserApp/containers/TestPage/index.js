import React, { Component } from 'react';
import {
  List,
  ListItem,
  ListSubHeader,
  ListCheckbox
} from 'react-toolbox/lib/list';

const test = {
  id: 1,
  name: 'testName#1',
  description: 'description of test 1'
};

class TestPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Test: {test.name}
      </div>
    );
  }
}

export default TestPage;
