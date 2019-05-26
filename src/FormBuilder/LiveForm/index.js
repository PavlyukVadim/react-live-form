import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from 'src/config';
import {
  formConfigValidation,
  getInitialFormState,
  getLiveFormFields,
  getFormComponents,
} from '../helpers';
import '../../stylesheets/main.scss';

const propTypes = {
  onSubmit: PropTypes.func,
  formConfig: PropTypes.object.isRequired,
  dataSource: PropTypes.object,
};

const defaultProps = {
  onSubmit: () => {},
  dataSource: {},
};

class LiveForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState(props);
  }

  componentDidMount() {
    this.setLiveFormFields(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(() => this.getInitialState(nextProps),
      () => {
        this.setLiveFormFields(nextProps);
      });
  }

  getInitialState = (props = this.props) => {
    const {
      formConfig,
      formConfig: {
        formName = config.defaultFormName,
      },
    } = props;

    const initialFormState = getInitialFormState(formConfig);
    const state = Object.assign(
      {},
      initialFormState,
      {
        isFormConfigValid: false,
        formName,
      },
    );
    return state;
  }

  setLiveFormFields = (props = this.props) => {
    const { formConfig, dataSource } = props;
    const formState = this.getCurrentFormState();

    const isFormConfigValid = formConfigValidation(formConfig);
    this.setState({
      isFormConfigValid,
    });

    if (isFormConfigValid) {
      const { fields } = formConfig;
      this.liveFormFields = getLiveFormFields(fields, dataSource);
      this.firstFieldsUpdate(formState);
    }
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
        updateFunction(formState, this.updateFormState);
      }
    });
  };

  updateFormState = (newFieldPart, callback) => {
    this.setState((prevState) => {
      const { formName, [formName]: formState } = prevState;
      const fieldName = Object.keys(newFieldPart)[0];

      const newField = Object.assign(
        {},
        {
          [fieldName]: {
            ...formState[fieldName],
            ...newFieldPart[fieldName],
          },
        },
      );

      const newFormState = Object.assign(
        {},
        formState,
        newField,
      );

      return {
        [formName]: newFormState,
      };
    }, () => {
      const formState = this.getCurrentFormState();
      if (callback) {
        callback(formState, this.updateFormState);
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

  formSubmit = () => {
    const { onSubmit } = this.props;
    const formState = this.getCurrentFormState();
    if (onSubmit) {
      onSubmit(formState);
    }
    console.log('formState', formState);
  }

  render() {
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
      this.formSubmit,
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
