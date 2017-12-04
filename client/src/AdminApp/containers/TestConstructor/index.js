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
    
    return (
      <FormItem
        key={field.name}
        fieldConfig={field}
        fieldState={formState}
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
    this.state = {
      formTestConfig: [],
      formTestState: {},
      formConstructorConfig: getFieldsConfigByFieldType(),
      currFormTestField: {},
    };
    this.addField = this.addField.bind(this);
    this.changeCurrFormTestField = this.changeCurrFormTestField.bind(this);
    this.changeFormField = this.changeFormField.bind(this);
  }

  addField() {
    this.setState((prevState) => {
      const newField = {
        name: 'field4',
        fieldType: 'input',
        dataType: 'int',
        title: 'field4',
        defaultValue: 0,
      };
      const formTestConfig = [...prevState.formTestConfig, newField];
      return {
        formTestConfig,
        currFormTestField: newField,
      };
    });
  }

  changeCurrFormTestField(newCurrFormTestField) {
    this.setState({
      currFormTestField: newCurrFormTestField,
    });
  }

  changeFormField(fieldName, propName, propValue) {
    console.log(fieldName, propName, propValue);

    this.setState((prevState) => {
      const {
        formTestConfig,
        currFormTestField
      } = prevState;

      console.log('currFormTestField', currFormTestField);
      
      const field = Object.assign({}, currFormTestField);
      field[fieldName] = propValue;
      const newFormTestConfig = [].concat(formTestConfig);
      
      for(const key in newFormTestConfig) {
        if (newFormTestConfig[key].name === field.name) {
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
      console.log('2 currFormTestField', this.state.currFormTestField)
    });
  };

  render() {
    const {
      formTestConfig,
      currFormTestField,
      formTestState,
      formConstructorConfig
    } = this.state;
    const namesOfFields = formTestConfig.map((field) => field.name);
    
    console.log('render currFormTestField', currFormTestField);
    
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
            onClick={this.addField}
          />
          <SelectOfFields
            fields={namesOfFields}
            value={currFormTestField.name}
            onChange={this.changeCurrFormTestField}
          />
          {
            getForm(
              formTestState,
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
