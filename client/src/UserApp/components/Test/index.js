import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  Button,
  Dialog,
} from 'react-toolbox/lib';
import getFormItemByFieldType from './../../../FormBuilder/getFormItemByFieldType';
import './Test.scss';

const getForm = (
  formState,
  fields = [],
  changeFormField
) => {
  console.log('fields', fields)
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
      testTitle,
      testDesc,
      formState,
      formConfig,
      changeFormField,
      formSubmit,
      testStatus,
      isDialogActive,
      goToPassed,
    } = this.props;

    const form = getForm(
      formState,
      formConfig,
      changeFormField
    );

    const getTestsControlPanel = () => {
      if (testStatus === 'new') {
        return (
          <Button
            className="form-submit"
            onClick={formSubmit}
            icon='send'
            label='Send'
            raised
            primary
          />
        );
      }
    }

    const actions = [{ label: "Ok", onClick: goToPassed }];

    return (
      <div>
        <h1>Test: {testTitle}</h1>
        <h3>{testDesc}</h3>
        Form:
        <div className="formWrapper">
          {form}
          {getTestsControlPanel()}
        </div>
        <Dialog
          active={!!isDialogActive}
          actions={actions}
          onEscKeyDown={goToPassed}
          onOverlayClick={goToPassed}
          title='Success!'
        >
          <p>Yours answers were successfully saved!</p>
        </Dialog>
      </div>
    );
  }
}

export default Test;
