import React, { Component } from 'react';
import PropTypes from 'prop-types';

import config from 'src/config';

import {
  // changeFormField,
  formConfigValidation,
  // getFieldsDefaultValues,

  getInitialFormState,
  getLiveFormFields,
  getFormComponents,
  // getFormComponents,
  // getFormState,
} from '../helpers';

const propTypes = {
  formConfig: PropTypes.object.isRequired,
  dataSource: PropTypes.object,
};

const defaultProps = {
  dataSource: {},
};

class LiveForm extends Component {
  constructor(props) {
    super(props);
    const {
      formConfig,
      formConfig: {
        formName = config.defaultFormName,
      },
    } = props;

    const initialFormState = getInitialFormState(formConfig);
    this.state = Object.assign(
      {},
      initialFormState,
      {
        isFormConfigValid: false,
        formName,
      },
    );
  }

  componentDidMount() {
    const { formConfig, dataSource } = this.props;
    const formState = this.getCurrentFormState();

    const isFormConfigValid = formConfigValidation(formConfig);
    this.setState({
      isFormConfigValid,
    });

    if (isFormConfigValid) {
      const { fields } = formConfig;
      this.liveFormFields = getLiveFormFields(fields, dataSource);
      console.log('this.liveFormFields', this.liveFormFields);

      this.firstFieldsUpdate(formState);
    }
  }

  componentWillReceiveProps() {
    // this.setState(() => getInitialFormState(formConfig),
    //   () => {
    //     this.firstFieldsUpdate();
    //   });
  }

  getCurrentFormState = () => {
    const { formName, [formName]: formState } = this.state;
    return formState;
  };

  firstFieldsUpdate = (formState) => {
    Object.values(this.liveFormFields).forEach((liveFormField) => {
      const { subscribers = [] } = liveFormField;
      this.callSubscribers(subscribers, formState);
    });
  }

  callSubscribers = (subscribers, formState) => {
    subscribers.forEach((subscriber) => {
      const { function: updateFunction } = subscriber;
      if (updateFunction) {
        console.log('updateFunction', formState);
        updateFunction(formState, this.updateFormState);
      }
    });
  };

  updateFormState = (newField, callback) => {
    this.setState((prevState) => {
      const { formName, [formName]: formState } = prevState;
      const newFormState = Object.assign({}, formState, { ...newField });
      return {
        [formName]: newFormState,
      };
    }, () => {
      if (callback) {
        callback();
      }
    });
  };

  onChangeFormField = (fieldConfig, propName, propValue) => {
    const { name, subscribers = [] } = fieldConfig;
    const newField = {
      [name]: {
        [propName]: propValue,
      },
    };

    const callback = () => {
      const formState = this.getCurrentFormState();
      this.callSubscribers(subscribers, formState);
    };

    this.updateFormState(newField, callback);
  }

  formSubmit = (value) => {
    console.log('this', this);
    console.log('value', value);
  }

  render() {
    console.log('state', this.state);
    console.log('props', this.props);

    const {
      isFormConfigValid,
      formName,
      [formName]: formState,
    } = this.state;

    if (!isFormConfigValid) {
      return null;
    }

    const form = getFormComponents(
      formState,
      this.liveFormFields,
      this.onChangeFormField,
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
