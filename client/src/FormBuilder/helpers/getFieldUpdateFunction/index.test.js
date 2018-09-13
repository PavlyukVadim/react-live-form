import { Parser } from 'expr-eval';
import getFieldUpdateFunction from './index';

const parser = new Parser({
  operators: {
    'in': true,
  },
});

describe('getFieldUpdateFunction', () => {
  test('return ', () => {
    const formElement = {};
    const context = {
      state: {
        field1: {
          value: 5,
        },
      },
      setState: jest.fn(),
    };
    const updateExpr = parser.parse('field1 * 2');
    const parents = updateExpr.variables(); // field1
    const fieldName = 'field2';
    const propName = 'value';

    const updateFunction = getFieldUpdateFunction(
      formElement,
      context,
      parents,
      updateExpr,
      fieldName,
      propName
    );

    updateFunction();
    expect(context.setState).toHaveBeenCalled();
  });
});
