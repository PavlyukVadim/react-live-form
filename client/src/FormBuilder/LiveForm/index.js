import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  analysisFormDeps,
  callUpdateOnSubscribers,
  changeFormField,
  formConfigValidation,
  getFieldsDefaultValues,
  getLiveFormFields,
  // getFormComponents,
  // getFormState,
} from '../helpers';

const propTypes = {
  status: PropTypes.string,
};

const defaultProps = {
  status: 'new',
};

class LiveForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormConfigValid: false,
    };

    // this.state = getFieldsDefaultValues(props.formConfig);
    // this.formElements = analysisFormDeps(this, props.formConfig);
  }

  componentDidMount() {
    const { formConfig, dataSource } = this.props;

    const isFormConfigValid = formConfigValidation(formConfig);
    this.setState({
      isFormConfigValid,
    });

    if (isFormConfigValid) {
      const { fields } = formConfig;
      this.liveFormFields = getLiveFormFields(fields, dataSource);
      console.log('this.liveFormFields', this.liveFormFields);
    }

    // this.firstFieldsUpdate();
  }

  componentWillReceiveProps(newProps) {
    const { status, formConfig } = this.props;
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
    console.log(this.state, this.props);
    // const { status, formConfig } = this.props;
    const { isFormConfigValid } = this.state;

    if (!isFormConfigValid) {
      return null;
    }

    // const answers = {};

    // const formState = getFormState(
    //   status,
    //   this.state,
    //   answers,
    // );

    // const form = getFormComponents(
    //   formState,
    //   formConfig,
    //   this.changeFormField,
    // );

    const form = null;

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
