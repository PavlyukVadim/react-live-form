import React, { Component } from 'react';
import {
  List,
  ListItem,
  ListSubHeader,
  ListCheckbox
} from 'react-toolbox/lib/list';
import timeAgoEnglish from './../../../utils/TimeAgoEnglish';

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
    console.log('Tests List', this.props)
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

    // if (!data) {
    //   tests = [];
    // } else if (data.allTests) {
    //   tests = data.allTests.map((e) => {
    //     const test = Object.assign({}, e);
    //     test.link = e.test_id;
    //     return test;
    //   });
    // } else if (data.answersByStatusAndUserId) {
    //   tests = data.answersByStatusAndUserId.map((e) => {
    //     const test = Object.assign({}, e.test);
    //     test.link = e.answer_id;
    //     test.passage_date = e.passage_date;
    //     test.status_id = e.status_id;
    //     return test;
    //   });
    // }

    const TestItems = tests.map((test) => {
      // const legend = data.allTests ? test.title
                    // : timeAgoEnglish.format(new Date(test.passage_date));
      let icon = 'add_box';
      if (test.status_id === '1') {
        icon = 'undo';
      } else if (test.status_id === '2') {
        icon = 'assessment';
      }

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
