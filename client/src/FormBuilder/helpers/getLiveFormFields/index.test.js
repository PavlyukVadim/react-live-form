import config from 'src/config';
import getLiveFormFields from './index';

describe('getLiveFormFields', () => {
  let formFields = [];
  beforeEach(() => {
    formFields = [...config.exampleOfFormConfigFields];
  });

  test('should return empty array if config doesn\'n of the array type' , () => {
    const formFields = 'config';
    const result = getLiveFormFields(formFields);
    expect(result).toEqual([]);
  });

  test('should return the same config if fields w/o dependencies' , () => {
    const formFields = [
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
    ];
    const result = getLiveFormFields(formFields);
    expect(result).toEqual(formFields);
  });

  test('should return the fields with real field update function and subscribers in parent field' , () => {
    const formFields = [
      {
        name: 'a',
        fieldType: 'input',
        dataType: 'int',
      },
      {
        name: 'b',
        fieldType: 'input',
        dataType: 'int',
        state: {
          date: {
            defaultValue: '30.08.1998',
            valueFn: 'getDateValue',
            watch: ['a'],
          },
        },
      },
    ];

    const dateUpdateFunction = jest.fn();

    const dataSource = {
      b: {
        date: {
          getDateValue: dateUpdateFunction,
        },
      },
    };

    const updatedDateObj = {
      defaultValue: '30.08.1998',
      valueFn: 'getDateValue',
      function: dateUpdateFunction,
      watch: ['a'],
    };

    const expectedResult = [
      {
        name: 'a',
        fieldType: 'input',
        dataType: 'int',
        subscribers: [
          updatedDateObj,
        ],
      },
      {
        name: 'b',
        fieldType: 'input',
        dataType: 'int',
        state: {
          date: updatedDateObj,
        },
      },
    ];
    const result = getLiveFormFields(formFields, dataSource);
    expect(result).toEqual(expectedResult);
  });

  test('should return the fields with real field update function (parsed from expr) and subscribers in parent field' , () => {
    const formFields = [
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
        dataType: 'int',
        state: {
          sum: {
            value: 'a + b',
          },
        },
      },
    ];

    const sumUpdateFunction = jest.fn();
    const updatedSumObj = {
      value: 'a + b',
      function: sumUpdateFunction,
    };

    const expectedResult = [
      {
        name: 'a',
        fieldType: 'input',
        dataType: 'int',
        subscribers: [
          updatedSumObj,
        ],
      },
      {
        name: 'b',
        fieldType: 'input',
        dataType: 'int',
        subscribers: [
          updatedSumObj,
        ],
      },
      {
        name: 'c',
        fieldType: 'input',
        dataType: 'int',
        state: {
          sum: updatedSumObj,
        },
      },
    ];
    const result = getLiveFormFields(formFields);

    expect(result[0]).toHaveProperty('subscribers');
    expect(result[1]).toHaveProperty('subscribers');
    expect(result[2].state.sum).toHaveProperty('function');
  });
});
