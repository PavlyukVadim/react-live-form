const commonFieldsConfig = [
  {
    name: 'name',
    fieldType: 'input',
    title: 'Input name:',
  },
  {
    name: 'fieldType',
    fieldType: 'select',
    title: 'Choose type of field:',
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
    title: 'Field title:',
  },
  {
    name: 'state',
    fieldType: 'state',
    title: 'Field state:',
  },
];

export default commonFieldsConfig;
