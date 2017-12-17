import React, { Component } from 'react';
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
    console.log('Test list', this.props)
    const {
      subHeader,
      data,
    } = this.props;

    if (data && data.error) {
      return(
        <div>error</div>
      );
    }

    let tests = [];
    if (!data) {
      tests = [];
    } else if (data.allTests) {
      tests = data.allTests;
    } else if (data.answersByStatusAndUserId) {
      tests = data.answersByStatusAndUserId;
    }

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

export default TestsList;
