import getDataSourceValue from '../getDataSourceValue';

const updateFieldByValueFn = (
  liveFormFields,
  fieldName,
  stateFieldName,
  stateField,
  dataSource,
) => {
  const realValueFunction = getDataSourceValue(
    dataSource,
    fieldName,
    stateFieldName,
    stateField.valueFn,
  );

  stateField.function = realValueFunction;

  const { watch = [] } = stateField;
  watch.forEach((nameOfParentField) => {
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

export default updateFieldByValueFn;
