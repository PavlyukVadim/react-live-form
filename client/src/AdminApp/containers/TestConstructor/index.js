import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
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
    this.saveTest = this.saveTest.bind(this);
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

  saveTest(
    userId,
    title,
    description,
    formConfig
  ) {
    this.props.mutation({
      variables: {
        userId,
        title,
        description,
        formConfig,
      }
    });
  }

  render() {
    const {
      formTestConfig,
      currFormTestField,
      formConstructorConfig,
    } = this.state;
    
    const data = {
      testById: {
        formConfig: formTestConfig, 
      },
    };
    
    return (
      <div className="row">
        <div className="col-sm-6">
          <TestEditor
            formTestConfig={formTestConfig}
            currFormTestField={currFormTestField}
            formConstructorConfig={formConstructorConfig}
            addFormTestField={this.addFormTestField}
            changeCurrFormTestField={this.changeCurrFormTestField}
            changeFormTestField={this.changeFormTestField}
            saveTest={this.saveTest}
          />
        </div>
        <div className="col-sm-6">
          <TestPage
            data={data}
            status="new"
          />
        </div>
        <div>
          {JSON.stringify(formTestConfig, undefined, 2)}
        </div>
      </div>
    );
  }
}

// export default TestConstructor;

const AddTest = gql`
  mutation AddTest(
    $userId: String!,
    $title: String!,
    $description: String!,
    $formConfig: JSON!
  ) {
    AddTest(
      userId: $userId,
      title: $title,
      description: $description,
      formConfig: $formConfig
    ) {
      test_id
    }
  }
`;

const TestConstructorWithData = graphql(AddTest)(TestConstructor);

export default TestConstructorWithData;
