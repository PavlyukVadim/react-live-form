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
    state: {
      value: {
        defaultValue: 5,
      },
    },
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
        valueExpr: 'a + b',
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
        watch: ['a'],
      },
    },
  },
];

export default formConfig;
