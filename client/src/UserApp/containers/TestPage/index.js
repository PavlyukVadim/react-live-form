import React, { Component } from 'react';
import { Parser } from 'expr-eval';
import {
  List,
  ListItem,
  ListSubHeader,
  ListCheckbox
} from 'react-toolbox/lib/list';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Input from './FormComponents/Input';
import Select from './FormComponents/Select';
import './TestPage.scss';

const kvArray = [
  ['input', Input],
  ['select', Select]
];

const parser = new Parser();
// const expr = parser.parse("x == '2'");
// const res = expr.evaluate({
//   'x': '2'
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
      fieldStateProps.map((propName) => {
        const propValue = fieldState[propName];
        const expr = parser.parse(propValue);
        const parents = expr.variables();
        parents.map((parentName) => {
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

      formElement.update = () => {
        for (const updateFunction of formElement.updateFunctions) {
          updateFunction();
        }
      };
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

const formItemsMap = new Map(kvArray);
const getFormItemByFieldType = (fieldType) => {
  return formItemsMap.get(fieldType);
};

const getForm = (context, fields = []) => {
  return fields.map((field) => {
    const FormItem = getFormItemByFieldType(field.fieldType);
    return (
      <ReactCSSTransitionGroup
        key={field.name}
        component="div"
        transitionName="example"
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={700}
      >
        {
          context.state[field.name].display !== false &&
          <FormItem
            fieldConfig={field}
            fieldState={context.state[field.name]}
            onChange={(e) => changeFormField(context, field.name, 'value', e.target.value)}
          />
        }
      </ReactCSSTransitionGroup>
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
    const { formConfig } = this.props;
    this.state = getFieldsInitialValues(formConfig);
    this.formElements = analysisFormDeps(this, formConfig);
  }

  render() {
    console.log('component state', this.state);
    return (
      <div>
        <h1>Test: {test.name}</h1>
        Form:
        <div className="formWrapper" style={{backgroundColor: '#ccc', width: '500px'}}>
          {getForm(this, this.props.formConfig)}
        </div>
      </div>
    );
  }
}

export default TestPage;
