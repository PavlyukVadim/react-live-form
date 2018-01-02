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
    const history = this.props.history;
    const newPath = `${history.location.pathname}/test/${id}`;
    history.push(newPath);
  }

  render() {
    const {
      subHeader,
      tests,
      error,
    } = this.props;

    if (error) {
      return(
        <div>error</div>
      );
    }

    const TestItems = tests.map((test) => {
      return (
        <ListItem
          key={test.test_id}
          caption={test.title}
          legend={test.legend}
          leftIcon={test.icon}
          onClick={() => this.goToTestPage(test.link)}
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
