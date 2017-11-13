import React, { Component } from 'react';
import { Parser } from 'expr-eval';
import {
  List,
  ListItem,
  ListSubHeader,
  ListCheckbox
} from 'react-toolbox/lib/list';
import formConfig from './formConfig';

const parser = new Parser();

const test = {
  id: 1,
  name: 'testName#1',
  description: 'description of test 1'
};

const analysisFormDeps = (fields) => {
  const formElements = {};
  for (const field of fields) {
    const formElement = {};
    const fieldName = field.name;
    if (field.state && field.state.value) {
      const expr = parser.parse(field.state.value);
      const subscribers = expr.variables();
      formElement.parents = subscribers;
      subscribers.map((subscriberName) => {
        if (formElements[subscriberName].subscribers) {
          formElements[subscriberName].subscribers.push(fieldName);
        } else {
          formElements[subscriberName].subscribers = [fieldName];
        }
      });

      formElement.updateRule = field.state.value;
      formElement.updateExpr = expr;
    }
    formElements[fieldName] = formElement;
  }
  return formElements;
};

const getForm = (fields = [], context) => {
  return fields.map((field) => {
    return (
      <div key={field.name}>
        <input
          type='text'
          label={field.title}
          name={field.name}
          maxLength={16}
          value={context.state && context.state[field.name] || 0}
          ref={(input)=> context.formElements[field.name].ref = input}
          onChange={(e) => {
            const value = e.target.value;
            context.setState({
              [field.name]: value
            });
          }}
        />
      </div>
    );
  });
};

class TestPage extends Component {
  constructor(props) {
    super(props);
    this.formElements = analysisFormDeps(formConfig, this);
    console.log('this.formElements', this.formElements)
  }

  render() {
    console.log('this', this);
    return (
      <div>
        <h1>Test: {test.name}</h1>
        Form:
        <div className="formWrapper" style={{backgroundColor: '#ccc', width: '500px'}}>
          {getForm(formConfig, this)}
        </div>
      </div>
    );
  }
}

export default TestPage;
