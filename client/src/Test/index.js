import React from 'react';
import getFormItemByFieldType from '../FormBuilder/getFormItemByFieldType';
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
      <div>
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
      </div>
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
        <button
          className="form-submit"
          onClick={formSubmit}
          type="submit"
        >
          Submit
        </button>
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
