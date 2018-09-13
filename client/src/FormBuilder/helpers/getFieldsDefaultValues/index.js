const getFieldsDefaultValues = (fields = []) => {
  const fieldsDefaultValues = {};
  fields.forEach((field) => {
    fieldsDefaultValues[field.name] = {
      value: field.defaultValue || 0,
    };
  });
  return fieldsDefaultValues;
};

export default getFieldsDefaultValues;
