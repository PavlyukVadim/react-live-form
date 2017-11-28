import {
  analysisFormDeps
} from './index.js';
// import { formConfig } from './formConfig';

describe('analysisFormDeps', () => {
  
  let myContext;
  beforeEach(() => {
    myContext = {};
  });

  test('return {} for empty fields', () => {
    expect(analysisFormDeps(myContext, [])).toMatchObject({});
  });

  
  test('return {} with props as fields name for fields without own state', () => {
    const formConfig = [{
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
    }];

    expect(analysisFormDeps(myContext, formConfig)).toEqual({
      field1: {},
      field2: {},
    });
  });


  test('return {} with props as fields name for fields without own state', () => {
    const formConfig = [{
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
        value: 'field1 + field2',
        display: 'field1 > 5'
      }
    }];

    const updateFunction = () => {};

    expect(analysisFormDeps(myContext, formConfig)).toMatchObject({
      field1: {
        subscribers: ['field3']
      },
      field2: {
        subscribers: ['field3']
      },
      field3: {
        update: () => {},
        updateFunctions: [
          updateFunction,
          updateFunction
        ]
      },
    });
  });


});
