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

const analysisFormDeps = (fields, context) => {
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
      formElement.update = () => {
        const values = {};
        formElement.parents.map((parentName) => {
          values[parentName] = context.state[parentName];
        });
        const newValue = formElement.updateExpr.evaluate(values);
        context.setState({
          [fieldName]: newValue
        }, () => {
          const fieldSubscribers = context.formElements[field.name].subscribers;
          if (fieldSubscribers) {
            for (const subscriberName of fieldSubscribers) {
              context.formElements[subscriberName].update();
            }
          }
        });
      };
    }
    formElements[fieldName] = formElement;
  }
  return formElements;
};

const getForm = (fields = [], context) => {
  return fields.map((field) => {
    return (
      <div key={field.name}>
        <p>{field.title}</p>
        <input
          type='text'
          label={field.title}
          name={field.name}
          maxLength={16}
          value={context.state && context.state[field.name]}
          onChange={(e) => {
            const value = e.target.value;
            context.setState({
              [field.name]: value
            }, () => {
              const fieldSubscribers = context.formElements[field.name].subscribers;
              if (fieldSubscribers) {
                for (const subscriberName of fieldSubscribers) {
                  context.formElements[subscriberName].update();
                }
              }
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
    this.state = {
      field1: 0,
      field2: 0,
      field3: 0,
      field4: 0,
      field5: 0,
      field6: 0,
      field7: 0,
      field8: 0,
      field9: 0,
      field10: 0,
      field11: 0,
      field12: 0,
      field13: 0,
      field14: 0,
      field15: 0,
    };
    this.formElements = analysisFormDeps(formConfig, this);
  }

  render() {
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
