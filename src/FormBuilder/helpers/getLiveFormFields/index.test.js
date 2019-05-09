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
      },
      {
        name: 'b',
        fieldType: 'input',
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
      },
      {
        name: 'b',
        fieldType: 'input',
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
        subscribers: [
          updatedDateObj,
        ],
      },
      {
        name: 'b',
        fieldType: 'input',
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
      },
      {
        name: 'b',
        fieldType: 'input',
      },
      {
        name: 'c',
        fieldType: 'input',
        state: {
          sum: {
            valueExpr: 'a + b',
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
        subscribers: [
          updatedSumObj,
        ],
      },
      {
        name: 'b',
        fieldType: 'input',
        subscribers: [
          updatedSumObj,
        ],
      },
      {
        name: 'c',
        fieldType: 'input',
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
