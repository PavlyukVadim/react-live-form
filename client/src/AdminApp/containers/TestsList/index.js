import React, { Component } from 'react';
import {
  List,
  ListItem,
  ListSubHeader,
  ListCheckbox,
  RadioGroup,
  RadioButton,
} from 'react-toolbox';

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
    } else if (data.passedAnswers) {
      const passedAnswers = data.passedAnswers.map((e) => {
        const answer = Object.assign({}, e);
        answer.link = e.answer_id;
        return answer;
      });
      const assessedAnswers = data.assessedAnswers.map((e) => {
        const answer = Object.assign({}, e);
        answer.link = e.answer_id;
        return answer;
      });
      tests = [...passedAnswers, ...assessedAnswers];
    }

    const TestItems = tests.map((answer) => {
      const userName = answer.user.name;
      const timeAgo = timeAgoEnglish.format(new Date(answer.passage_date));
      
      let icon = 'add_box';
      if (answer.status_id === '1') {
        icon = 'undo';
      } else if (answer.status_id === '2') {
        icon = 'assessment';
      }

      return (
        <ListItem
          key={answer.link}
          leftIcon={icon}
          caption={answer.test.title}
          legend={`User '${userName}' passed ${timeAgo}`}
          onClick={() => this.goToTestPage(answer.link)}
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
