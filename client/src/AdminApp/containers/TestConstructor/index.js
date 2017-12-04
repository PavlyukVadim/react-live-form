import React, { Component } from 'react';
import SelectOfFields from './../../components/SelectOfFields';
import TestPage from './../../../UserApp/containers/TestPage';
import getFormItemByFieldType from './../../../FormBuilder/getFormItemByFieldType';
import getFieldsConfigByFieldType from './../../../FormBuilder/getFieldsConfigByFieldType';

// {
//   name: 'field1',
//   fieldType: 'input',
//   dataType: 'int',
//   title: 'field1',
//   defaultValue: 10,
// },
// {
//   name: 'field2',
//   fieldType: 'input',
//   dataType: 'int',
//   title: 'field2',
//   defaultValue: 0,
// },
// {
//   name: 'field3',
//   fieldType: 'input',
//   dataType: 'int',
//   title: 'field3',
//   defaultValue: 0,
//   state: {
//     value: 'field1 + field2'
//   }
// }

const getForm = (
  formState,
  fields = [],
  changeFormField
) => {
  return fields.map((field) => {
    const FormItem = getFormItemByFieldType(field.fieldType);
    const fieldName = field.name;
    console.log('field', field)
    const fieldState = {
      value: formState[fieldName],
    };
    
    // console.log('------------')
    // console.log('field', field)
    // console.log('fieldState', fieldState)
    // console.log('------------')

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


// const getcurrFormTestField = (fields, nameOfcurrFormTestFields) => {
//   for (field of fields) {
//     if (field.name === nameOfcurrFormTestFields) {
//       return field;
//     }
//   }
// };

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
    console.log('this.state', this.state);
    this.addFormTestField = this.addFormTestField.bind(this);
    this.changeCurrFormTestField = this.changeCurrFormTestField.bind(this);
    this.changeFormField = this.changeFormField.bind(this);
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
      // const formConstructorConfig = getFieldsConfigByFieldType(field.fieldType);
      return {
        // formConstructorConfig,
        currFormTestField: newCurrFormTestField,  
      }
    });
  }

  

  changeFormField(fieldName, propName, propValue) {
    console.log(fieldName, propName, propValue);

    this.setState((prevState) => {
      const {
        formTestConfig,
        currFormTestField
      } = prevState;

      // console.log('currFormTestField', currFormTestField);
      
      const field = Object.assign({}, currFormTestField);
      field[fieldName] = propValue;
      const newFormTestConfig = [].concat(formTestConfig);
      
      for(const key in newFormTestConfig) {
        if (newFormTestConfig[key] === currFormTestField) {
          newFormTestConfig[key] = field;
        }
      }

      const formConstructorConfig = getFieldsConfigByFieldType(field.fieldType);

      return {
        formConstructorConfig,
        formTestConfig: newFormTestConfig,
        currFormTestField: field
      };
    }, () => {
      // console.log('2 currFormTestField', this.state.currFormTestField)
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
              this.changeFormField
            )
          }
        </div>
      </div>
    );
  }
}

export default TestConstructor;
