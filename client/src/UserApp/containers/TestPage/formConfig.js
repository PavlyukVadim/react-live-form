const formConfig = [
  {
    name: 'field1',
    fieldType: 'input',
    dataType: 'int',
    title: 'title for field1',
    defaultValue: 0
  },
  {
    name: 'field2',
    fieldType: 'input',
    dataType: 'int',
    title: 'title for field2',
    defaultValue: 0,
  },
  {
    name: 'field3',
    fieldType: 'input',
    dataType: 'int',
    title: 'title for field3',
    defaultValue: 0,
    state: {
      value: 'field1 + field2'
    }
  },
  {
    name: 'field4',
    fieldType: 'input',
    dataType: 'int',
    title: 'title for field4',
    defaultValue: 0,
    state: {
      value: 'field3 * 2'
    }
  }
];

export default formConfig;
