import React, { Component } from 'react';
import SelectOfFields from './../../components/SelectOfFields';
import TestPage from './../../../UserApp/containers/TestPage';
import getFormItemByFieldType from './../../../FormBuilder/getFormItemByFieldType';
import getFieldsConfigByFieldType from './../../../FormBuilder/getFieldsConfigByFieldType';

const getForm = (
  formState,
  fields = [],
  changeFormField
) => {
  return fields.map((field) => {
    const FormItem = getFormItemByFieldType(field.fieldType);
    const fieldName = field.name;
    const fieldState = {
      value: formState[fieldName],
    };
    
    return (
      <FormItem
        key={field.name}
        fieldConfig={field}
        fieldState={fieldState}
        changeFormField={changeFormField}
      />
    );
  });
};

const getFieldsDefaultValues = (fields) => {
  const fieldsDefaultValues = {};
  for (const field of fields) {
    fieldsDefaultValues[field.name] = {
      value: field.defaultValue || 0
    };
  }
  return fieldsDefaultValues;
};

class TestConstructor extends Component {
  constructor(props) {
    super(props);
    const formConstructorConfig = getFieldsConfigByFieldType();
    this.state = {
      formTestConfig: [],
      formConstructorConfig,
      formConstructorState: getFieldsDefaultValues(formConstructorConfig),
    };
    this.addFormTestField = this.addFormTestField.bind(this);
    this.changeCurrFormTestField = this.changeCurrFormTestField.bind(this);
    this.changeFormTestField = this.changeFormTestField.bind(this);
  }

  addFormTestField() {
    const nameOfNewField = 'new field';
    this.setState((prevState) => {
      const newField = {
        name: nameOfNewField,
        fieldType: 'input',
        dataType: 'int',
        title: 'title for new field',
        defaultValue: 0,
      };
      const formTestConfig = [...prevState.formTestConfig, newField];
      return {
        formTestConfig,
      };
    }, () => {
      this.changeCurrFormTestField(nameOfNewField);
    });
  }

  changeCurrFormTestField(nameOfNewCurrFormTestField) {
    this.setState((prevState) => {
      const {
        formTestConfig
      } = prevState;

      let newCurrFormTestField = {};
      for(const key in formTestConfig) {
        if (formTestConfig[key].name === nameOfNewCurrFormTestField) {
          newCurrFormTestField = formTestConfig[key];          
        }
      }
      
      return {
        currFormTestField: newCurrFormTestField,  
      }
    }, () => {
      this.changeFormConstructorConfig();
    });
  }

  changeFormConstructorConfig() {
    this.setState((prevState) => {
      const {
        currFormTestField
      } = prevState;
      const formConstructorConfig = getFieldsConfigByFieldType(currFormTestField.fieldType);
      return {
        formConstructorConfig,
      };
    });
  }

  changeFormTestField(fieldName, propName, propValue) {
    this.setState((prevState) => {
      const {
        formTestConfig,
        currFormTestField
      } = prevState;
      
      const newCurrFormTestField = Object.assign({}, currFormTestField);
      newCurrFormTestField[fieldName] = propValue;
      const newFormTestConfig = [].concat(formTestConfig);
      
      for(const key in newFormTestConfig) {
        if (newFormTestConfig[key] === currFormTestField) {
          newFormTestConfig[key] = newCurrFormTestField;
        }
      }

      return {
        formTestConfig: newFormTestConfig,
        currFormTestField: newCurrFormTestField,
      };
    }, () => {
      this.changeFormConstructorConfig();
    });
  };

  render() {
    const {
      formTestConfig,
      currFormTestField,
      formConstructorConfig,
      formConstructorState,
    } = this.state;
    const namesOfFields = formTestConfig.map((field) => field.name);
    
    console.log('render formTestConfig', formTestConfig);
    console.log('render currFormTestField', currFormTestField);
    // console.log('render formConstructorState', formConstructorState);

    return (
      <div className="row">
        <div className="col-sm-6">
          <TestPage
            formConfig={formTestConfig}
          />
        </div>
        <div className="col-sm-6">
          <input
            type="button"
            value="add field"
            onClick={this.addFormTestField}
          />
          {
            currFormTestField &&
            <SelectOfFields
              fields={namesOfFields}
              value={currFormTestField.name}
              onChange={this.changeCurrFormTestField}
            />  
          }
          {
            currFormTestField &&
            getForm(
              currFormTestField,
              formConstructorConfig,
              this.changeFormTestField
            )
          }
        </div>
      </div>
    );
  }
}

export default TestConstructor;
