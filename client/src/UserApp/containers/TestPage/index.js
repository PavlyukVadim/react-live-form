import React, { Component } from 'react';
import analysisFormDeps from './analysisFormDeps';
import callUpdateOnSubscribers from './callUpdateOnSubscribers';
import changeFormField from './changeFormField';
import Test from '../../components/Test';

import formConfig from './formConfig'

const getFieldsDefaultValues = (fields) => {
  const fieldsDefaultValues = {};
  for (const field of fields) {
    fieldsDefaultValues[field.name] = {
      value: field.defaultValue || 0
    };
  }
  return fieldsDefaultValues;
};

const getFormState = (
  status,
  state,
  answers,
  comment,
) => {
  if (status === 'new') {
    return state;
  }
  const newAnswers = {};
  for (const key in answers) {
    newAnswers[key] = Object.assign({}, answers[key]);
    newAnswers[key].disabled = true;
  }
  if (status === 'assessed') {
    newAnswers['comment'] = {
      value: comment,
    };
    newAnswers['comment'].disabled = true;
  }

  return newAnswers;
};

class TestPage extends Component {
  constructor(props) {
    super(props);
    this.state = getFieldsDefaultValues(formConfig);
    this.formElements = analysisFormDeps(this, formConfig);
    this.changeFormField = this.changeFormField.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  componentDidMount() {
    this.firstFieldsUpdate();
  }

  componentWillReceiveProps(newProps) {
    let formConfig;
    if (this.props.status === 'new') {
      console.log('new---------------');
      if (!newProps.data && !newProps.data.testById) {
        return;
      }
      formConfig = newProps.data.testById.formConfig;
    } else if (this.props.status === 'passed') {
      if (!newProps.data && !newProps.data.answerById) {
        return;
      }
      formConfig = newProps.data.answerById.test.formConfig;
    } else if (this.props.status === 'assessed') {
      if (!newProps.data && !newProps.data.answerById) {
        return;
      }
      formConfig = newProps.data.answerById.test.formConfig;
    }

    this.formElements = analysisFormDeps(this, formConfig);
    this.setState(() => {
      return getFieldsDefaultValues(formConfig);
    }, () => {
      this.firstFieldsUpdate();
    });
  }

  firstFieldsUpdate() {
    for (const key in this.formElements) {
      const formElement = this.formElements[key];
      const fieldSubscribers = formElement.subscribers;
      callUpdateOnSubscribers(fieldSubscribers, this.formElements);
    }
  }

  changeFormField(fieldName, propName, propValue) {
    changeFormField(this, fieldName, propName, propValue);
  }

  formSubmit() {

  }

  render() {
    const {
      data,
      status,
    } = this.props;

    console.log('TetsPage', this.props);

    let answers, comment, title, description;
    // if (status === 'new') {
    //   formConfig = [].concat(data.testById.formConfig);
    //   title = data.testById.title;
    //   description = data.testById.description;
    // } else if (status === 'passed') {
    //   formConfig = [].concat(data.answerById.test.formConfig);
    //   answers = Object.assign({}, data.answerById.form_answers);
    //   title = data.answerById.test.title;
    //   description = data.answerById.test.description;
    // } else if (status === 'assessed') {
    //   formConfig = [].concat(data.answerById.test.formConfig);
    //   answers = Object.assign({}, data.answerById.form_answers);
    //   comment = data.answerById.comment.content;
    //   title = data.answerById.test.title;
    //   description = data.answerById.test.description;
    // }

    const formState = getFormState(
      status,
      this.state,
      answers,
      comment,
    );

    return (
      <div>
        <Test
          testStatus={status}
          formState={formState}
          formConfig={formConfig}
          changeFormField={this.changeFormField}
          formSubmit={this.formSubmit}
        />
      </div>
    );
  }
}

export default TestPage;
