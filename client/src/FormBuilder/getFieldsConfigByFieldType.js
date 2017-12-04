import commonFieldsConfig from './commonFieldsConfig';
import selectFieldConfig from './FormComponents/Select/selectFieldConfig';

const getFieldsConfigByFieldType = (fieldType) => {
  if (fieldType === 'select') {
    return [...commonFieldsConfig, ...selectFieldConfig];
  }
  return [...commonFieldsConfig];
};

export default getFieldsConfigByFieldType;
