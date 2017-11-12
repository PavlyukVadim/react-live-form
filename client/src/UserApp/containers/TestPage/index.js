import React, { Component } from 'react';
import {
  List,
  ListItem,
  ListSubHeader,
  ListCheckbox
} from 'react-toolbox/lib/list';
import formConfig from './formConfig';
import { Parser } from 'expr-eval';

var parser = new Parser();
var expr = parser.parse('2 * x(5) + 1');
console.log(expr.evaluate({ x: () => 10 })); // 21

const test = {
  id: 1,
  name: 'testName#1',
  description: 'description of test 1'
};

const hiddenClass = {
  display: 'none'
};

const analysisFormDeps = (fields) => {
  // return fields.map((field) => {

  // }
};

const getForm = (fields = [], context) => {
  console.log('context', context);
  return fields.map((field) => {
    return (
      <div>
        <input
          type='text'
          label={field.title}
          name={field.name}
          maxLength={16}
          onChange={(e) => console.log(e)}
        />
      </div>
    );
  });
};

class TestPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Test: {test.name}</h1>
        Form:
        <div className="formWrapper" style={{backgroundColor: '#ccc', width: '500px'}}>
          {getForm(formConfig, this)}
        </div>
      </div>
    );
  }
}

export default TestPage;
