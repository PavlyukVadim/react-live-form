import React, { Component } from 'react';
import { Parser } from 'expr-eval';
import {
  List,
  ListItem,
  ListSubHeader,
  ListCheckbox
} from 'react-toolbox/lib/list';
import formConfig from './formConfig';

const parser = new Parser();

const test = {
  id: 1,
  name: 'testName#1',
  description: 'description of test 1'
};

const hiddenClass = {
  display: 'none'
};

const analysisFormDeps = (fields) => {
  return fields.map((field) => {
    if (field.state && field.state.value) {
      var expr = parser.parse(field.state.value);
      console.log(field.name, expr.variables());
    }
  });
};
analysisFormDeps(formConfig);

const getForm = (fields = [], context) => {
  return fields.map((field) => {
    return (
      <div>
        <input
          type='text'
          label={field.title}
          name={field.name}
          maxLength={16}
          value={context.state && context.state[field.name]}
          onChange={(e) => {
            const value = e.target.value;
            context.setState({
              [field.name]: value
            })
          }}
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
