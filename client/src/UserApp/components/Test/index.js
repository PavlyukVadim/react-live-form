import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Input from './../FormComponents/Input';
import Select from './../FormComponents/Select';
import './Test.scss';

const test = {
  id: 1,
  name: 'testName#1',
  description: 'description of test 1'
};

const kvArray = [
  ['input', Input],
  ['select', Select]
];

const formItemsMap = new Map(kvArray);
const getFormItemByFieldType = (fieldType) => {
  return formItemsMap.get(fieldType);
};

const getForm = (
  formState,
  fields = [],
  changeFormField
) => {
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
          formState[field.name].display !== false &&
          <FormItem
            fieldConfig={field}
            fieldState={formState[field.name]}
            onChange={(e) => changeFormField(field.name, 'value', e.target.value)}
          />
        }
      </ReactCSSTransitionGroup>
    );
  });
};


class Test extends Component {
  render() {
    const {
      formState,
      formConfig,
      changeFormField
    } = this.props;
    return (
      <div>
        <h1>Test: {test.name}</h1>
        Form:
        <div className="formWrapper" style={{backgroundColor: '#ccc', width: '500px'}}>
          {getForm(formState, formConfig, changeFormField)}
        </div>
      </div>
    );
  }
}

export default Test;
