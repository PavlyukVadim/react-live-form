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
  },
  {
    name: 'field5',
    fieldType: 'input',
    dataType: 'int',
    title: 'title for field5',
    defaultValue: 0,
    state: {
      value: 'field3 * 2'
    }
  },
  {
    name: 'field6',
    fieldType: 'input',
    dataType: 'int',
    title: 'title for field6',
    defaultValue: 0,
    state: {
      value: 'field2 * 21'
    }
  },
  {
    name: 'field7',
    fieldType: 'input',
    dataType: 'int',
    title: 'title for field7 (f3 * 3 + f2 * 2)',
    defaultValue: 0,
    state: {
      value: 'field3 * 3 + field2 * 2'
    }
  },
  {
    name: 'field8',
    fieldType: 'input',
    dataType: 'int',
    title: 'title for field8 (f7 - 5)',
    defaultValue: 0,
    state: {
      value: 'field7 - 5'
    }
  },
  {
    name: 'field9',
    fieldType: 'input',
    dataType: 'int',
    title: 'title for field9',
    defaultValue: 0,
    state: {
      value: 'field3 / 2'
    }
  },
  {
    name: 'field10',
    fieldType: 'input',
    dataType: 'int',
    title: 'title for field10',
    defaultValue: 0,
    state: {
      value: 'field3 * 2'
    }
  },
  {
    name: 'field11',
    fieldType: 'input',
    dataType: 'int',
    title: 'title for field11',
    defaultValue: 0,
    state: {
      value: 'field3 * 2'
    }
  },
  {
    name: 'field12',
    fieldType: 'input',
    dataType: 'int',
    title: 'title for field12',
    defaultValue: 0,
    state: {
      value: 'field3 * 2'
    }
  },
  {
    name: 'field13',
    fieldType: 'input',
    dataType: 'int',
    title: 'title for field13',
    defaultValue: 0,
    state: {
      value: 'field3 * 2'
    }
  },
  {
    name: 'field14',
    fieldType: 'input',
    dataType: 'int',
    title: 'title for field14',
    defaultValue: 0,
    state: {
      value: 'field3 * 2'
    }
  },
  {
    name: 'field15',
    fieldType: 'input',
    dataType: 'int',
    title: 'title for field15',
    defaultValue: 0,
    state: {
      value: 'field3 * 2'
    }
  }
];

export default formConfig;
