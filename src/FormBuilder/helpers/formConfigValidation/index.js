import config from 'src/config';

const formConfigValidation = (formConfig) => {
  if (formConfig !== Object(formConfig)) {
    console.error('formConfig should be a object');
    return false;
  }

  const { fields } = formConfig;
  if (!fields) {
    console.error('formConfig should contain array of fields');
    return false;
  }

  if (!Array.isArray(fields)) {
    console.error('fields should be an array');
    return false;
  }

  if (!fields.length) {
    console.error('fields should contain at least one obj');
    return false;
  }

  const { fields: { requiredProps } } = config;
  const isInvalidField = fields.some((field) => {
    if (field !== Object(field)) {
      console.error('fields should be objects');
      return true;
    }

    const fieldProps = Object.keys(field);

    return requiredProps.some((props) => {
      const isIncludes = fieldProps.includes(props);
      if (!isIncludes) {
        console.error(`field should contain props ${props}`);
        return true;
      }
      return false;
    });
  });

  if (isInvalidField) {
    return false;
  }

  return true;
};

export default formConfigValidation;
