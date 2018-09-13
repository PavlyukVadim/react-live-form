import callUpdateOnSubscribers from '../callUpdateOnSubscribers';

const changeFormField = (
  context,
  fieldName,
  propName,
  propValue,
) => {
  context.setState((prevState) => {
    const newFieldProps = Object.assign({}, prevState[fieldName]);
    newFieldProps[propName] = propValue;
    return {
      [fieldName]: newFieldProps,
    };
  }, () => {
    const fieldSubscribers = context.formElements[fieldName].subscribers;
    callUpdateOnSubscribers(fieldSubscribers, context.formElements);
  });
};

export default changeFormField;
