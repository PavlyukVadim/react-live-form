const formConfig = {
  formName: 'sideEffectsForm',
  fields: [],
  onSubmit: 'submitFunction',
};

formConfig.fields = [
  {
    name: 'a',
    fieldType: 'input',
    dataType: 'int',
    props: {
      title: 'field a',
    },
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
    props: {
      title: 'field b',
    },
    state: {
      value: {
        defaultValue: 0,
        valueExpr: 'a * 2',
      },
    },
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
        valueExpr: 'b * 2',
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
      value: {
        defaultValue: 0,
        valueExpr: 'c * 2',
      },
    },
  },
];

export default formConfig;
