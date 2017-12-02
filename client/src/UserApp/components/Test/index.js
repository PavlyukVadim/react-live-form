import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Input from './../FormComponents/Input';
import Select from './../FormComponents/Select';
import Textarea from './../FormComponents/Textarea';
import './Test.scss';

const test = {
  id: 1,
  name: 'testName#1',
  description: 'description of test 1'
};

const kvArray = [
  ['input', Input],
  ['select', Select],
  ['textarea', Textarea],
];

const formItemsMap = new Map(kvArray);
const getFormItemByFieldType = (fieldType) => {
  return formItemsMap.get(fieldType);
};

const getForm = (
  formState,
  fields = [],
  changeFormField,
  changeMultipleFormField
) => {
  return fields.map((field) => {
    const FormItem = getFormItemByFieldType(field.fieldType);
    const fieldName = field.name;
    
    return (
      <ReactCSSTransitionGroup
        key={fieldName}
        component="div"
        transitionName="example"
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={700}
      >
        {
          formState[fieldName].display !== false &&
          <FormItem
            fieldConfig={field}
            fieldState={formState[fieldName]}
            changeFormField={changeFormField}
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
      changeFormField,
      changeMultipleFormField
    } = this.props;

    return (
      <div>
        <h1>Test: {test.name}</h1>
        Form:
        <div className="formWrapper" style={{backgroundColor: '#ccc', width: '500px'}}>
          {
            getForm(
              formState,
              formConfig,
              changeFormField,
              changeMultipleFormField
            )
          }
        </div>
      </div>
    );
  }
}

export default Test;
