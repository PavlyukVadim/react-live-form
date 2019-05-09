const formConfig = {
  formName: 'firstFrom',
  fields: [],
  onSubmit: 'submitFunction',
};

formConfig.fields = [
  {
    name: 'a',
    fieldType: 'input',
  },
  {
    name: 'b',
    fieldType: 'input',
  },
  {
    name: 'c',
    fieldType: 'input',
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
