const commonFieldsConfig = [
  {
    name: 'name',
    fieldType: 'input',
    title: 'input name',
  },
  {
    name: 'fieldType',
    fieldType: 'select',
    title: 'choose type of field',
    defaultValue: 'input',
    options: [
      {
        value: 'input',
        content: 'input',
      },
      {
        value: 'select',
        content: 'select',
      },
      {
        value: 'checkbox',
        content: 'checkbox',
      },
      {
        value: 'textarea',
        content: 'textarea',
      },
    ],
  },
  {
    name: 'title',
    fieldType: 'input',
    title: 'field title',
  },
  {
    name: 'state',
    fieldType: 'state',
    title: 'field state',
  },
];

export default commonFieldsConfig;
