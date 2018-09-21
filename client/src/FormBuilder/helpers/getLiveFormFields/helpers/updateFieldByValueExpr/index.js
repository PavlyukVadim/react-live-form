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
  const { valueExpr } = stateField;
  const expr = parser.parse(valueExpr);
  const parents = expr.variables();

  const realValueFunction = (formState, callback) => {
    const variablesValues = {};
    parents.forEach((parentName) => {
      variablesValues[parentName] = formState[parentName].value || 0;
    });
    const newPropValue = expr.evaluate(variablesValues);
    if (callback) {
      const newFieldValue = Object.assign(
        {},
        { [stateFieldName]: newPropValue },
      );
      const newField = {
        [fieldName]: newFieldValue,
      };
      callback(newField);
    }
  };
  stateField.function = realValueFunction;

  parents.forEach((nameOfParentField) => {
    const parentField = liveFormFields.find((field) => (field.name === nameOfParentField));
    if (parentField) {
      parentField.subscribers = parentField.subscribers
        ? [...parentField.subscribers, stateField]
        : [stateField];
    } else {
      liveFormFields.push({
        name: fieldName,
        subscribers: [stateField],
      });
    }
  });
};

export default updateFieldByValueExpr;
