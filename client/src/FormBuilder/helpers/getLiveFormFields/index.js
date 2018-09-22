import config from 'src/config';

import {
  findFieldParents,
  getFieldUpdateFunction,
} from './helpers';

const { fields: { stateCalculatedFields } } = config;

const addFieldsSubscribers = (liveFormFields, dataSource) => {
  liveFormFields.forEach((field) => {
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
            // check dependency state field on other fields
            const isCalculatedField = stateCalculatedFields.includes(propKey);
            if (isCalculatedField) {
              // push state field as subscriber to parent's fields
              const findFieldParentsFunc = findFieldParents(propKey);

              findFieldParentsFunc(
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

    field = updatedField;
  });
};

const addFieldsUpdateFunc = (liveFormFields, dataSource) => {
  liveFormFields.forEach((field) => {
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
            // check dependency state field on other fields
            const isCalculatedField = stateCalculatedFields.includes(propKey);
            if (isCalculatedField) {
              // push state field as subscriber to parent's fields
              const fieldUpdateFunction = getFieldUpdateFunction(propKey);

              fieldUpdateFunction(
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

    field = updatedField;
  });
};

const getLiveFormFields = (formFields, dataSource = {}) => {
  if (!Array.isArray(formFields)) {
    return [];
  }

  const liveFormFields = [...formFields];
  addFieldsSubscribers(liveFormFields, dataSource);
  addFieldsUpdateFunc(liveFormFields, dataSource);

  return liveFormFields;
};

export default getLiveFormFields;
