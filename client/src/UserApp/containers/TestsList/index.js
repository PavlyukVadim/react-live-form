import React, { Component } from 'react';
import {
  List,
  ListItem,
  ListSubHeader,
  ListCheckbox
} from 'react-toolbox/lib/list';
import javascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locales/en'
import 'javascript-time-ago/intl-messageformat-global'
import 'intl-messageformat/dist/locale-data/en';
javascriptTimeAgo.locale(en)
const timeAgoEnglish = new javascriptTimeAgo('en-US');

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
      tests = data.allTests.map((e) => {
        const test = Object.assign({}, e);
        test.link = e.test_id;
        return test;
      });
    } else if (data.answersByStatusAndUserId) {
      tests = data.answersByStatusAndUserId.map((e) => {
        const test = Object.assign({}, e.test);
        test.link = e.answer_id;
        test.passage_date = e.passage_date;
        return test;
      });
    }

    const TestItems = tests.map((test) => {
      const legend = data.allTests ? test.title
                    : timeAgoEnglish.format(new Date(test.passage_date));
      return (
        <ListItem
          key={test.link}
          avatar=""
          caption={test.title}
          legend={legend}
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
