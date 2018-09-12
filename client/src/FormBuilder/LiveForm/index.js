import React, { Component } from 'react';
import PropTypes from 'prop-types';
import analysisFormDeps from './analysisFormDeps';
import callUpdateOnSubscribers from './callUpdateOnSubscribers';
import changeFormField from './changeFormField';

import { getFormComponents } from '../helpers';

import formConfig from '../../formConfig0';

const getFieldsDefaultValues = (fields = []) => {
  const fieldsDefaultValues = {};
  fields.forEach((field) => {
    fieldsDefaultValues[field.name] = {
      value: field.defaultValue || 0,
    };
  });
  return fieldsDefaultValues;
};

const getFormState = (
  status,
  state,
  answers,
) => {
  if (status === 'new') {
    return state;
  }

  const newAnswers = {};

  Object.keys(answers).forEach((key) => {
    newAnswers[key] = Object.assign({}, answers[key]);
    newAnswers[key].disabled = true;
  });

  return newAnswers;
};

const propTypes = {
  status: PropTypes.string,
};

const defaultProps = {
  status: 'new',
};

class LiveForm extends Component {
  constructor(props) {
    super(props);
    this.state = getFieldsDefaultValues(formConfig);
    this.formElements = analysisFormDeps(this, formConfig);
    console.log('this.formElements', this.formElements);

    this.changeFormField = this.changeFormField.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  componentDidMount() {
    this.firstFieldsUpdate();
  }

  componentWillReceiveProps(newProps) {
    const { status } = this.props;
    if (status === 'new') {
      console.log('new---------------');
      if (!newProps.data && !newProps.data.testById) {
        return;
      }
    }

    this.formElements = analysisFormDeps(this, formConfig);
    this.setState(() => getFieldsDefaultValues(formConfig),
      () => {
        this.firstFieldsUpdate();
      });
  }

  firstFieldsUpdate() {
    console.log('this.formElements', this.formElements);
    Object.values(this.formElements).forEach((formElement) => {
      const { subscribers } = formElement;
      if (subscribers) {
        callUpdateOnSubscribers(subscribers, this.formElements);
      }
    });
  }

  changeFormField(fieldName, propName, propValue) {
    changeFormField(this, fieldName, propName, propValue);
  }

  formSubmit(value) {
    console.log('this', this);
    console.log('value', value);
  }

  render() {
    const { status } = this.props;
    const answers = {};
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
    );

    const form = getFormComponents(
      formState,
      formConfig,
      this.changeFormField,
    );

    return (
      <div>
        <div>
          Form:
          <div className="formWrapper">
            {form}
          </div>
        </div>
      </div>
    );
  }
}

LiveForm.propTypes = propTypes;
LiveForm.defaultProps = defaultProps;

export default LiveForm;