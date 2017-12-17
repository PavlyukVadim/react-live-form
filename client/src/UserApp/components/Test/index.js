import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import getFormItemByFieldType from './../../../FormBuilder/getFormItemByFieldType';
import './Test.scss';

const test = {
  id: 1,
  name: 'testName#1',
  description: 'description of test 1'
};

const getForm = (
  formState,
  fields = [],
  changeFormField
) => {
  return fields.map((field) => {
    console.log('field', field);
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
      formSubmit,
      testStatus,
    } = this.props;

    console.log('Test', this.props);

    const form = getForm(
      formState,
      formConfig,
      changeFormField
    );

    const getTestsControlPanel = () => {
      if (testStatus === 'new') {
        return (
          <input
            className="form-submit"
            type="submit"
            onClick={formSubmit}
          />
        );
      }
    }

    return (
      <div>
        <h1>Test: {test.name}</h1>
        Form:
        <div className="formWrapper">
          {form}
          {getTestsControlPanel()}
        </div>
      </div>
    );
  }
}

export default Test;
