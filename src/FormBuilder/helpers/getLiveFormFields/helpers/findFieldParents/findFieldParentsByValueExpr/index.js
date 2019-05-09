import { Parser } from 'expr-eval';

const parser = new Parser({
  operators: {
    in: true,
  },
});

const findFieldParentsByValueExpr = (
  liveFormFields,
  fieldName,
  stateFieldName,
  stateField,
) => {
  const { valueExpr } = stateField;
  try {
    const expr = parser.parse(valueExpr);
    const parents = expr.variables();
    parents.forEach((nameOfParentField) => {
      const parentField = liveFormFields.find((field) => (field.name === nameOfParentField));
      if (parentField) {
        parentField.subscribers = parentField.subscribers
          ? [...parentField.subscribers, stateField]
          : [stateField];
      }
    });
  } catch (e) {
    console.error('Parse error', e);
  }
};

export default findFieldParentsByValueExpr;
