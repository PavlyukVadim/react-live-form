import { Parser } from 'expr-eval';

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
  const liveFormField = liveFormFields.find((formField) => (formField.name === fieldName));
  const { subscribers = [] } = liveFormField;
  const { valueExpr } = stateField;

  let expr;
  let parents = [];

  try {
    expr = parser.parse(valueExpr);
    parents = expr.variables();
  } catch (e) {
    console.error('Parse error', e);
    return;
  }

  /**
  * function that will call on parent's changes
  *
  * @param  {Object} formState - object with current formState
  * @param  {Function} updateFormState - function that update formState with newField
  */
  const realValueFunction = (formState, updateFormState) => {
    const variablesValues = {};
    parents.forEach((parentName) => {
      variablesValues[parentName] = formState[parentName].value || 0;
    });
    const newPropValue = expr.evaluate(variablesValues);
    if (typeof updateFormState === 'function') {
      const newFieldValue = Object.assign(
        {},
        { [stateFieldName]: newPropValue },
      );
      const newField = {
        [fieldName]: newFieldValue,
      };

      /**
      * function that will call field's subscribers auto update
      *
      * @param  {Object} updatedFormState - object with current formState
      * @param  {Function} callback - function that update formState with newField
      */
      const updateSubscribers = (updatedFormState, callback) => {
        subscribers.forEach((subscriber) => {
          const { function: updateFunction } = subscriber;
          if (updateFunction) {
            updateFunction(updatedFormState, callback);
          }
        });
      };

      updateFormState(newField, updateSubscribers);
    }
  };
  stateField.function = realValueFunction;
};

export default updateFieldByValueExpr;
