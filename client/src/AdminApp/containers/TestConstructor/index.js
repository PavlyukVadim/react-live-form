import React, { Component } from 'react';
import TestPage from './../../../UserApp/containers/TestPage';

const formConfig = [
  {
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
];

class TestConstructor extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <TestPage
            formConfig={formConfig}
          />
        </div>
        <div className="col-md-6">
          TestConfig
        </div>
      </div>
    );
  }
}

export default TestConstructor;
