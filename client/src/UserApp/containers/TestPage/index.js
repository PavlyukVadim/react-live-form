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

class TestPage extends Component {
  constructor(props) {
    super(props);
    const { formConfig } = this.props;
    this.state = getFieldsDefaultValues(formConfig);
    this.formElements = analysisFormDeps(this, formConfig);
    this.changeFormField = this.changeFormField.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  componentDidMount() {
    this.firstFieldsUpdate();
  }

  componentWillReceiveProps(newProps) {
    this.setState(() => {
      return getFieldsDefaultValues(newProps.formConfig);
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
    const values = {};
    for (const key in this.state) {
      values[key] = this.state[key].value;
    }
    console.log(values);
    return values;
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Test
          formState={this.state}
          formConfig={this.props.formConfig}
          changeFormField={this.changeFormField}
          formSubmit={this.formSubmit}
        />
      </div>
    );
  }
}

export default TestPage;
