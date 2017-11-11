const formConfig = [
  {
    name: 'field1',
    fieldType: 'input',
    dataType: 'int',
    title: 'title for field1',
    defaultValue: 0,
    state: {
      display: true
    }
  },
  {
    name: 'field2',
    fieldType: 'input',
    dataType: 'int',
    title: 'title for field2',
    defaultValue: 0,
    state: {
      display: 'field1 = 5'
    }
  },
];

export default formConfig;
