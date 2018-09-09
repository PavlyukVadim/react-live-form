import React, { Component } from 'react';
import analysisFormDeps from './analysisFormDeps';
import callUpdateOnSubscribers from './callUpdateOnSubscribers';
import changeFormField from './changeFormField';
import Test from '../../components/Test';
import fetchPassedTests from './../TestsLists/queries/fetchPassedTests';

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

const updateFormConfig = (formConfig, status) => {
  const updatedFormConfig = [].concat(formConfig);
  if (status === 'assessed') {
    const commentField = {
      name: 'comment',
      fieldType: 'textarea',
      dataType: 'string',
      title: 'Admin comment:',
      defaultValue: '',
    };
    updatedFormConfig.push(commentField);
  }
  return updatedFormConfig;
};

const getFormConfig = (props) => {
  let formConfig = [];
  if (props.data && props.data.loading) {
    return formConfig;
  }
  if (props.status === 'new') {
    console.log('new---------------');
    if (!props.data && !props.data.testById) {
      return;
    }
    formConfig = props.data.testById.formConfig;
  } else if (props.status === 'passed') {
    if (!props.data && !props.data.answerById) {
      return;
    }
    formConfig = props.data.answerById.test.formConfig;
  }
  return formConfig;
};

class TestPage extends Component {
  constructor(props) {
    super(props);
    console.log('props', props)
    const formConfig = getFormConfig(props);
    this.state = getFieldsDefaultValues(formConfig);
    this.formElements = {}; //analysisFormDeps(this, formConfig);
    this.changeFormField = this.changeFormField.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.goToPassed = this.goToPassed.bind(this);
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
    const values = this.state;
    const testId = this.props.data.testById.test_id;
    const userId = window.localStorage.getItem('rr_userId');
    const formAnswers = JSON.stringify(values);
    const statusId = '1';

    this.props.mutate({
      variables: {
        testId,
        userId,
        formAnswers,
        statusId,
      },
      refetchQueries: [{
        query: fetchPassedTests,
        variables: {
          userId: window.localStorage.getItem('rr_userId'),
        },
      }]
    }).then(() => this.setState({isDialogActive: true}));
  }

  goToPassed() {
    this.props.history.push('/user/passed');
  }

  render() {
    const {
      data,
      status,
    } = this.props;

    if (data.loading) {
      return (
        <div>loading</div>
      );
    }

    console.log('TetsPage', this.props);

    let formConfig, answers, comment, title, description;
    if (status === 'new') {
      formConfig = [].concat(data.testById.formConfig);
      title = data.testById.title;
      description = data.testById.description;
    } else if (status === 'passed') {
      formConfig = [].concat(data.answerById.test.formConfig);
      answers = Object.assign({}, data.answerById.form_answers);
      title = data.answerById.test.title;
      description = data.answerById.test.description;
    } else if (status === 'assessed') {
      formConfig = [].concat(data.answerById.test.formConfig);
      answers = Object.assign({}, data.answerById.form_answers);
      comment = data.answerById.comment.content;
      title = data.answerById.test.title;
      description = data.answerById.test.description;
    }

    const formState = getFormState(
      status,
      this.state,
      answers,
      comment,
    );

    const updatedFormConfig = updateFormConfig(
      formConfig,
      status
    );

    return (
      <div>
        <Test
          testTitle={title}
          testDesc={description}
          testStatus={status}
          formState={formState}
          formConfig={updatedFormConfig}
          changeFormField={this.changeFormField}
          formSubmit={this.formSubmit}
          isDialogActive={this.state.isDialogActive}
          goToPassed={this.goToPassed}
        />
      </div>
    );
  }
}

export default TestPage;
