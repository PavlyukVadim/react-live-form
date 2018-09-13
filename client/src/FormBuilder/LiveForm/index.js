import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  analysisFormDeps,
  callUpdateOnSubscribers,
  changeFormField,
  getFieldsDefaultValues,
  getFormComponents,
  getFormState,
} from '../helpers';

import formConfig from '../../formConfig0';

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

  firstFieldsUpdate = () => {
    Object.values(this.formElements).forEach((formElement) => {
      const { subscribers } = formElement;
      if (subscribers) {
        callUpdateOnSubscribers(subscribers, this.formElements);
      }
    });
  }

  changeFormField = (fieldName, propName, propValue) => {
    changeFormField(this, fieldName, propName, propValue);
  }

  formSubmit = (value) => {
    console.log('this', this);
    console.log('value', value);
  }

  render() {
    const { status } = this.props;
    const answers = {};

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
        Form:
        <div className="formWrapper">
          {form}
        </div>
      </div>
    );
  }
}

LiveForm.propTypes = propTypes;
LiveForm.defaultProps = defaultProps;

export default LiveForm;
