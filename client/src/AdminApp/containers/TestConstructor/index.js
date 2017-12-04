import React, { Component } from 'react';
import TestPage from './../../../UserApp/containers/TestPage';
import TestEditor from '../../components/TestEditor';
import getFieldsConfigByFieldType from './../../../FormBuilder/getFieldsConfigByFieldType';

class TestConstructor extends Component {
  constructor(props) {
    super(props);
    const formConstructorConfig = getFieldsConfigByFieldType();
    this.state = {
      formTestConfig: [],
      formConstructorConfig,
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
      };
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
    } = this.state;
    
    console.log('currFormTestField', currFormTestField)

    return (
      <div className="row">
        <div className="col-sm-6">
          <TestPage formConfig={formTestConfig} />
        </div>
        <div className="col-sm-6">
          <TestEditor
            formTestConfig={formTestConfig}
            currFormTestField={currFormTestField}
            formConstructorConfig={formConstructorConfig}
            addFormTestField={this.addFormTestField}
            changeCurrFormTestField={this.changeCurrFormTestField}
            changeFormTestField={this.changeFormTestField}
          />
        </div>
      </div>
    );
  }
}

export default TestConstructor;
