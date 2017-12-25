import React, { Component } from 'react';
import {
  Button,
  Dialog,
} from 'react-toolbox';
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
  saveTest,
  isDialogActive,
  goToPassed,
}) => {
  const namesOfFields = formTestConfig.map((field) => field.name);
  const actions = [{ label: "Ok", onClick: goToPassed }];
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
      <Button
        className="saveTest"
        onClick={saveTest}
        icon='send'
        label='Save Test'
        raised
        primary
      />
      <Dialog
        active={!!isDialogActive}
        actions={actions}
        onEscKeyDown={goToPassed}
        onOverlayClick={goToPassed}
        title='Success!'
      >
        <p>Your test was successfully saved!</p>
      </Dialog>
    </div>
  );
};

export default TestEditor;
