import React, { Component } from 'react';
import { Parser } from 'expr-eval';
import {
  List,
  ListItem,
  ListSubHeader,
  ListCheckbox
} from 'react-toolbox/lib/list';
import formConfig from './formConfig';
import Input from './FormComponents/Input';

const parser = new Parser();

const test = {
  id: 1,
  name: 'testName#1',
  description: 'description of test 1'
};

const analysisFormDeps = (context, fields) => {
  const formElements = {};
  for (const field of fields) {
    const formElement = {};
    const fieldName = field.name;
    const hasCalculatedValue = field.state && field.state.value;
    if (hasCalculatedValue) {
      const calculatedValue = field.state.value;
      const expr = parser.parse(calculatedValue);
      const subscribers = expr.variables();
      formElement.parents = subscribers;
      subscribers.map((subscriberName) => {
        if (formElements[subscriberName].subscribers) {
          formElements[subscriberName].subscribers.push(fieldName);
        } else {
          formElements[subscriberName].subscribers = [fieldName];
        }
      });

      formElement.updateRule = calculatedValue;
      formElement.updateExpr = expr;
      formElement.update = () => {
        const values = {};
        formElement.parents.map((parentName) => {
          values[parentName] = context.state[parentName];
        });
        const newValue = formElement.updateExpr.evaluate(values);
        changeFormField(context, fieldName, newValue);
      };
    }
    formElements[fieldName] = formElement;
  }
  return formElements;
};

const changeFormField = (context, fieldName, value) => {
  context.setState({
    [fieldName]: value
  }, () => {
    const fieldSubscribers = context.formElements[fieldName].subscribers;
    if (fieldSubscribers) {
      for (const subscriberName of fieldSubscribers) {
        context.formElements[subscriberName].update();
      }
    }
  });
};

const getForm = (context, fields = []) => {
  return fields.map((field) => {
    return (
      <div key={field.name}>
        <Input
          field={field}
          value={context.state && context.state[field.name]}
          onChange={(e) => changeFormField(context, field.name, e.target.value)}
        />
      </div>
    );
  });
};

const getFieldsInitialValues = (fields) => {
  const fieldsInitialValues = {};
  for (const field of fields) {
    fieldsInitialValues[field.name] = field.defaultValue || 0;
  }
  return fieldsInitialValues;
};

class TestPage extends Component {
  constructor(props) {
    super(props);
    this.state = getFieldsInitialValues(formConfig);
    this.formElements = analysisFormDeps(this, formConfig);
  }

  render() {
    return (
      <div>
        <h1>Test: {test.name}</h1>
        Form:
        <div className="formWrapper" style={{backgroundColor: '#ccc', width: '500px'}}>
          {getForm(this, formConfig)}
        </div>
      </div>
    );
  }
}

export default TestPage;
