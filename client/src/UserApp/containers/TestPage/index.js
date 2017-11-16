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
// const expr = parser.parse('x == 2');
// const res = expr.evaluate({
//   'x': 2
// });
// console.log('res', res);

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
    const isFieldHasOwnState = field.state && Object.keys(field.state).length > 0;

    if (isFieldHasOwnState) {
      const fieldState = field.state;
      const fieldStateProps = Object.keys(fieldState);
      formElement.update = () => {
        for (const updateFunction of formElement.updateFunctions) {
          updateFunction();
        }
      };

      fieldStateProps.map((propName) => {
        const propValue = fieldState[propName];
        const expr = parser.parse(propValue);
        const parents = expr.variables();
        parents.map((parentName) => {
          addSubscriberNameToField(formElements[parentName], fieldName);
        });

        const updateExpr = expr;
        const updateFunction = () => {
          const variablesValues = {};
          parents.map((parentName) => {
            variablesValues[parentName] = context.state[parentName].value;
          });
          const newPropValue = updateExpr.evaluate(variablesValues);
          console.log(fieldName, propName, newPropValue);
          changeFormField(context, fieldName, propName, newPropValue);
        };
        addUpdateFunction(formElement, updateFunction);
      });
    }
    formElements[fieldName] = formElement;
  }
  return formElements;
};

const addSubscriberNameToField = (field, subscriberName) => {
  if (field.subscribers) {
    if(!field.subscribers.includes(subscriberName)) {
      field.subscribers.push(subscriberName);
    }
  } else {
    field.subscribers = [subscriberName];
  }
};

const addUpdateFunction = (formElement, updateFunction) => {
  if (formElement.updateFunctions) {
    formElement.updateFunctions.push(updateFunction);
  } else {
    formElement.updateFunctions = [updateFunction];
  }
};

const changeFormField = (context, fieldName, propName, propValue) => {
  context.setState((prevState) => {
    const newFieldProps = Object.assign({}, prevState[fieldName]);
    newFieldProps[propName] = propValue;
    return {
      [fieldName]: newFieldProps
    };
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
          value={context.state && context.state[field.name].value}
          onChange={(e) => changeFormField(context, field.name, 'value', e.target.value)}
        />
      </div>
    );
  });
};

const getFieldsInitialValues = (fields) => {
  const fieldsInitialValues = {};
  for (const field of fields) {
    fieldsInitialValues[field.name] = {
      value: field.defaultValue || 0
    };
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
    // console.log('component state', this.state);
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
