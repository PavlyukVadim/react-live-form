import config from 'src/config';
import testFormConfig from 'src/testFormConfig';
import getInitialFormState from './index';

describe('getFormState', () => {
  let formConfig = {};
  beforeEach(() => {
    formConfig = Object.assign({}, testFormConfig);
  });

  test('should return object' , () => {
    const result = getInitialFormState(formConfig);
    expect(typeof result).toBe('object');
  });

  test('should return object with prop as formName' , () => {
    const { formName } = formConfig;
    const result = getInitialFormState(formConfig);
    expect(result).toHaveProperty(formName);
  });

  test('should return object with prop as default formName, if real is absent' , () => {
    const { defaultFormName } = config;
    const result = getInitialFormState({fields: []});
    expect(result).toHaveProperty(defaultFormName);
  });

  test('should return object with fields default values' , () => {
    const { fields } = formConfig;
    const result = getInitialFormState(formConfig);
    const expectedResult = {
      firstFrom: {
        a: {},
        b: {},
        c: {
          value: fields[2].state.value.defaultValue,
        },
        d: {
          date: fields[3].state.date.defaultValue,
        }
      },
    };
    expect(result).toEqual(expectedResult);
  });
});
