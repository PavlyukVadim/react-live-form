import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Button } from 'react-toolbox/lib';
import getFormItemByFieldType from '../../../FormBuilder/getFormItemByFieldType';
import './Test.scss';

const getForm = (
  formState,
  fields = [],
  changeFormField,
) => {
  console.log('fields', fields);
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
          (
            <FormItem
              fieldConfig={field}
              fieldState={formState[fieldName]}
              changeFormField={changeFormField}
            />
          )
        }
      </ReactCSSTransitionGroup>
    );
  });
};

const Test = ({
  formState,
  formConfig,
  changeFormField,
  formSubmit,
  testStatus,
}) => {
  const form = getForm(
    formState,
    formConfig,
    changeFormField,
  );

  const getTestsControlPanel = () => {
    if (testStatus === 'new') {
      return (
        <Button
          className="form-submit"
          onClick={formSubmit}
          icon="send"
          label="Send"
          raised
          primary
        />
      );
    }
    return null;
  };

  return (
    <div>
      Form:
      <div className="formWrapper">
        {form}
        {getTestsControlPanel()}
      </div>
    </div>
  );
};

export default Test;
