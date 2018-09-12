const formConfig = {
  formName: 'firstFrom',
  fields: [],
  onSubmit: 'submitFunction',
};

formConfig.fields = [
  {
    name: 'a',
    fieldType: 'input',
    dataType: 'int',
  },
  {
    name: 'b',
    fieldType: 'input',
    dataType: 'int',
  },
  {
    name: 'c',
    fieldType: 'input',
    dataType: 'string',
    props: {
      title: 'field c',
    },
    state: {
      value: {
        defaultValue: 0,
        valueExp: 'a + b',
      },
    },
  },
  {
    name: 'd',
    fieldType: 'input',
    dataType: 'string',
    props: {
      title: 'field d',
    },
    state: {
      date: {
        defaultValue: '30.08.1998',
        valueFn: 'getDateValue',
        watch: ['a', 'b'],
      },
    },
  },
];

export default formConfig;
