import React, { Component } from 'react';
import analysisFormDeps from './analysisFormDeps';
import callUpdateOnSubscribers from './callUpdateOnSubscribers';
import changeFormField from './changeFormField';
import Test from '../../components/Test';

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
    newAnswers[key] = answers[key];
    newAnswers[key].disabled = true;
  }
  if (status === 'assessed') {
    newAnswers['comment'] = {
      value: comment,
    };
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
      title: 'comment',
      defaultValue: '',
    };
    updatedFormConfig.push(commentField);
  }
  return updatedFormConfig;
};

class TestPage extends Component {
  constructor(props) {
    super(props);
    const { formConfig } = this.props;
    this.state = {};//getFieldsDefaultValues(formConfig);
    this.formElements = {}; //analysisFormDeps(this, formConfig);
    this.changeFormField = this.changeFormField.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  componentDidMount() {
    this.firstFieldsUpdate();
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.data && !newProps.data.testById) {
      return;
    }
    const formConfig = newProps.data.testById.formConfig;
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
    console.log(values);
    return values;
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

    const {
      formConfig,
      answers,
      comment,
    } = data.testById;

    const formState = getFormState(
      status,
      this.state,
      answers,
      comment,
    );

    const updatedFormConfig = updateFormConfig(formConfig, status);

    return (
      <div>
        <Test
          testStatus={status}
          formState={formState}
          formConfig={updatedFormConfig}
          changeFormField={this.changeFormField}
          formSubmit={this.formSubmit}
        />
      </div>
    );
  }
}

export default TestPage;
