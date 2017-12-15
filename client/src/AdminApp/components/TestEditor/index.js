import React, { Component } from 'react';
import getFormItemByFieldType from './../../../FormBuilder/getFormItemByFieldType';
import SelectOfFields from './../SelectOfFields';
import './TestEditor.scss';

const getFormConstructor = (
  currFormTestField,
  formConstructorConfig = [],
  changeFormTestField
) => {
  return formConstructorConfig.map((field) => {
    const FormItem = getFormItemByFieldType(field.fieldType);
    const fieldName = field.name;
    const fieldState = {
      value: currFormTestField[fieldName],
    };
    
    return (
      <FormItem
        key={field.name}
        fieldConfig={field}
        fieldState={fieldState}
        changeFormField={changeFormTestField}
      />
    );
  });
};

const TestEditor = ({
  formTestConfig,
  currFormTestField,
  formConstructorConfig,
  addFormTestField,
  changeCurrFormTestField,
  changeFormTestField,
}) => {
  const namesOfFields = formTestConfig.map((field) => field.name);
  return (
    <div className="testEditor-wrapper">
      <input
        className="newField-btn"
        type="button"
        value="add field"
        onClick={addFormTestField}
      />
      {
        currFormTestField &&
        <SelectOfFields
          fields={namesOfFields}
          value={currFormTestField.name}
          onChange={changeCurrFormTestField}
        />  
      }
      {
        currFormTestField &&
        getFormConstructor(
          currFormTestField,
          formConstructorConfig,
          changeFormTestField
        )
      }
    </div>
  );
};

export default TestEditor;
