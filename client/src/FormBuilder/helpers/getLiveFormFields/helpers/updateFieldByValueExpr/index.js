import { Parser } from 'expr-eval';

// const expr = parser.parse("x in arr");
// const res = expr.evaluate({
//   'x': 2,
//   'arr': [1, 2, 3]
// });
// console.log('res', res);

const parser = new Parser({
  operators: {
    in: true,
  },
});


const updateFieldByValueExpr = (
  liveFormFields,
  fieldName,
  stateFieldName,
  stateField,
) => {
  const { value } = stateField;
  const expr = parser.parse(value);
  const parents = expr.variables();

  const realValueFunction = () => {};
  stateField.function = realValueFunction;

  parents.forEach((nameOfParentField) => {
    const parentField = liveFormFields.find((field) => (field.name === nameOfParentField));
    if (parentField) {
      parentField.subscribers = parentField.subscribers
        ? [...parentField.subscribers, stateField]
        : [stateField]
    } else {
      liveFormFields.push({
        name,
        subscribers: [stateField],
      });
    }
  });
};

export default updateFieldByValueExpr;
