import React, { Component } from 'react';
import SelectOfFields from './../../components/SelectOfFields';
import TestPage from './../../../UserApp/containers/TestPage';

class TestConstructor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formConfig: [{
          name: 'field1',
          fieldType: 'input',
          dataType: 'int',
          title: 'field1',
          defaultValue: 10,
        },
        {
          name: 'field2',
          fieldType: 'input',
          dataType: 'int',
          title: 'field2',
          defaultValue: 0,
        },
        {
          name: 'field3',
          fieldType: 'input',
          dataType: 'int',
          title: 'field3',
          defaultValue: 0,
          state: {
            value: 'field1 + field2'
          }
        }
      ]
    };
    this.addField = this.addField.bind(this); 
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
      const formConfig = [...prevState.formConfig, newField];
      return {
        formConfig
      };
    });
  }

  render() {
    const {
      formConfig
    } = this.state;
    const namesOfFields = formConfig.map((field) => field.name);
    console.log('formConfig', formConfig);
    return (
      <div className="row">
        <div className="col-sm-6">
          <TestPage
            formConfig={formConfig}
          />
        </div>
        <div className="col-sm-6">
          <SelectOfFields
            fields={namesOfFields}
          />
          <input
            type="button"
            value="add field"
            onClick={this.addField}
          />
        </div>
      </div>
    );
  }
}

export default TestConstructor;
