import formConfigValidation from './index.js'

describe('formConfigValidation', () => {
  describe('check validation of the config', () => {
    test('should return error if config doesn\'n of the object type' , () => {
      const formConfig = 'config';
      const result = formConfigValidation(formConfig);
      expect(result).toEqual(false);
    });
  });

  describe('check validation of the fields', () => {
    test('should return error if no fields', () => {
      const formConfig = {};
      const result = formConfigValidation(formConfig);
      expect(result).toEqual(false);
    });

    test('should return error if fields don\'t of the array type', () => {
      const formConfig = {
        fields: {},
      };
      const result = formConfigValidation(formConfig);
      expect(result).toEqual(false);
    });

    test('should return error if fields are emtpy', () => {
      const formConfig = {
        fields: [],
      };
      const result = formConfigValidation(formConfig);
      expect(result).toEqual(false);
    });

    test('should return true if fields are array with at least one object', () => {
      const formConfig = {
        fields: [
          {
            name: 'a',
            fieldType: 'input',
          },
        ],
      };
      const result = formConfigValidation(formConfig);
      expect(result).toEqual(true);
    });
  });

  describe('check validation of the field config', () => {
    test('should return false if field doesn\'t include name', () => {
      const formConfig = {
        fields: [
          {
            fieldType: 'input',
          },
        ],
      };
      const result = formConfigValidation(formConfig);
      expect(result).toEqual(false);
    });

    test('should return false if field doesn\'t include fieldType', () => {
      const formConfig = {
        fields: [
          {
            name: 'a',
          },
        ],
      };
      const result = formConfigValidation(formConfig);
      expect(result).toEqual(false);
    });
  });
});
