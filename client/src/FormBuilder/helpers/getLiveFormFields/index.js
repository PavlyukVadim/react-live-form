import config from 'src/config';

import {
  updateFieldByValueExpr,
  updateFieldByValueFn,
} from './helpers';

const { fields: { stateCalculatedFields } } = config;

// functions that update initial formFields
const updateFunctionsMap = new Map([
  ['valueFn', updateFieldByValueFn],
  ['value', updateFieldByValueExpr],
]);

const getLiveFormFields = (formFields, dataSource = {}) => {
  if (!Array.isArray(formFields)) {
    return [];
  }

  const liveFormFields = [];

  formFields.forEach((field) => {
    const updatedField = Object.assign({}, field);
    const {
      name: fieldName,
      state,
    } = updatedField;

    if (state) {
      const stateFieldNames = Object.keys(state);
      if (stateFieldNames.length) {
        stateFieldNames.forEach((stateFieldName) => {
          const stateField = updatedField.state[stateFieldName];
          const propKeys = Object.keys(stateField);
          propKeys.forEach((propKey) => {
            const isCalculatedField = stateCalculatedFields.includes(propKey);
            if (isCalculatedField) {
              const updateFunction = updateFunctionsMap.get(propKey);
              updateFunction(
                liveFormFields,
                fieldName,
                stateFieldName,
                stateField,
                dataSource,
              );
            }
          });
        });
      }
    }

    liveFormFields.push(updatedField);
  });

  return liveFormFields;
};

export default getLiveFormFields;
