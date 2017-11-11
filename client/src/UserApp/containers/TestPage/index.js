import React, { Component } from 'react';
import {
  List,
  ListItem,
  ListSubHeader,
  ListCheckbox
} from 'react-toolbox/lib/list';
import { Input } from 'react-toolbox/lib/input';
import formConfig from './formConfig';

const test = {
  id: 1,
  name: 'testName#1',
  description: 'description of test 1'
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
          <Input type='text' label='Name' name='name' value={5} maxLength={16} />  
        </div>
      </div>
    );
  }
}

export default TestPage;
