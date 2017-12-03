import updateFieldSubscribers from './updateFieldSubscribers';

const changeFormField = (
  context,
  fieldName,
  propName,
  propValue
) => {
  context.setState((prevState) => {
    const newFieldProps = Object.assign({}, prevState[fieldName]);
    newFieldProps[propName] = propValue;
    return {
      [fieldName]: newFieldProps
    };
  }, () => {
    const fieldSubscribers = context.formElements[fieldName].subscribers;
    updateFieldSubscribers(fieldSubscribers, context.formElements);
  });
};

export default changeFormField;
