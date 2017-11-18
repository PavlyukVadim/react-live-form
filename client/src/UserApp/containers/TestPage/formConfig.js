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
  },
  {
    name: 'field4',
    fieldType: 'input',
    dataType: 'int',
    title: 'field4',
    defaultValue: 0,
    state: {
      value: 'field3 * 2',
      display: 'field3 > 10'
    }
  },
  {
    name: 'field5',
    fieldType: 'input',
    dataType: 'int',
    title: 'field5',
    defaultValue: 0,
    state: {
      value: 'field3 * 2'
    }
  },
  {
    name: 'field6',
    fieldType: 'input',
    dataType: 'int',
    title: 'field6',
    defaultValue: 0,
    state: {
      value: 'field2 * 21'
    }
  },
  {
    name: 'field7',
    fieldType: 'input',
    dataType: 'int',
    title: 'field7',
    defaultValue: 0,
    state: {
      value: 'field3 * 3 + field2 * 2'
    }
  },
  {
    name: 'field8',
    fieldType: 'input',
    dataType: 'int',
    title: 'field8',
    defaultValue: 0,
    state: {
      value: 'field7 - 5'
    }
  },
  {
    name: 'field9',
    fieldType: 'input',
    dataType: 'int',
    title: 'field9',
    defaultValue: 0,
    state: {
      value: 'field3 / 2'
    }
  },
  {
    name: 'field10',
    fieldType: 'select',
    dataType: 'string',
    title: 'field10',
    defaultValue: 'option2',
    options: [
      {
        value: 'option1',
        content: 'option1'
      },
      {
        value: 'option2',
        content: 'content for value2'
      }
    ]
  },
  {
    name: 'field11',
    fieldType: 'input',
    dataType: 'int',
    title: 'field11',
    defaultValue: 'some value',
    state: {
      display: "field10 == 'option1'"
    }
  },
  {
    name: 'field12',
    fieldType: 'input',
    dataType: 'int',
    title: 'field12',
    defaultValue: 0,
    state: {
      value: 'field3 * 2'
    }
  },
  {
    name: 'field13',
    fieldType: 'input',
    dataType: 'int',
    title: 'field13',
    defaultValue: 0,
    state: {
      value: 'field3 * 2'
    }
  },
  {
    name: 'field14',
    fieldType: 'input',
    dataType: 'int',
    title: 'field14',
    defaultValue: 0,
    state: {
      value: 'field3 * 2'
    }
  },
  {
    name: 'field15',
    fieldType: 'input',
    dataType: 'int',
    title: 'field15',
    defaultValue: 0,
    state: {
      value: 'field3 * 2'
    }
  }
];

export default formConfig;
