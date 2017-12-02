import React, { Component } from 'react';
import { Parser } from 'expr-eval';
import Test from '../../components/Test';

const parser = new Parser();
// const expr = parser.parse("x == '2'");
// const res = expr.evaluate({
//   'x': '2'
// });
// console.log('res', res);

export const analysisFormDeps = (context, fields) => {
  const formElements = {};
  for (const field of fields) {
    const fieldName = field.name;
    const formElement = formElements[fieldName] || {};
    const isFieldHasOwnState = field.state && Object.keys(field.state).length > 0;

    if (isFieldHasOwnState) {
      const fieldState = field.state;
      const fieldStateProps = Object.keys(fieldState);
      fieldStateProps.map((propName) => {
        const propValue = fieldState[propName];
        const expr = parser.parse(propValue);
        const parents = expr.variables();
        parents.map((parentName) => {
          if (!formElements[parentName]) {
            formElements[parentName] = {};
          }
          addSubscriberNameToField(formElements[parentName], fieldName);
        });

        addUpdateFunction(
          formElement,
          context,
          parents,
          expr,
          fieldName,
          propName
        );
      });

      const update = () => {
        for (const updateFunction of formElement.updateFunctions) {
          updateFunction();
        }
      };
      formElement.update = update;
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

const addUpdateFunction = (
  formElement,
  context,
  parents,
  updateExpr,
  fieldName,
  propName
) => {
  const updateFunction = () => {
    const variablesValues = {};
    parents.map((parentName) => {
      variablesValues[parentName] = context.state[parentName].value;
    });
    const newPropValue = updateExpr.evaluate(variablesValues);
    changeFormField(context, fieldName, propName, newPropValue);
  };

  if (formElement.updateFunctions) {
    formElement.updateFunctions.push(updateFunction);
  } else {
    formElement.updateFunctions = [updateFunction];
  }
};

const changeFormField = (
  context,
  fieldName,
  propName,
  propValue
) => {
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
    const { formConfig } = this.props;
    this.state = getFieldsInitialValues(formConfig);
    this.formElements = analysisFormDeps(this, formConfig);
    this.changeFormField = this.changeFormField.bind(this);
  }

  changeFormField(fieldName, propName, propValue) {
    changeFormField(this, fieldName, propName, propValue);
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Test
          formState={this.state}
          formConfig={this.props.formConfig}
          changeFormField={this.changeFormField}
        />
      </div>
    );
  }
}

export default TestPage;
