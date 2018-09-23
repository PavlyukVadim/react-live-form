import testFormConfig from './testFormConfig';

const config = {
  defaultFormName: 'liveForm',
  fields: {
    requiredProps: [
      'name',
      'fieldType',
    ],
    stateCalculatedFields: [
      'valueExpr',
      'valueFn',
    ],
  },
  exampleOfFormConfigFields: [...testFormConfig.fields],
};

export default config;
