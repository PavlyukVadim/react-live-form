import config from 'src/config';

const getInitialFormState = (formConfig) => {
  const initialFormState = {};
  const { defaultFormName } = config;
  const {
    formName = defaultFormName,
    fields,
  } = formConfig;

  initialFormState[formName] = {};
  fields.forEach((field) => {
    const { name, state = {} } = field;
    initialFormState[formName][name] = {};
    Object.keys(state).forEach((statePropKey) => {
      if ('defaultValue' in state[statePropKey]) {
        initialFormState[formName][name][statePropKey] = state[statePropKey].defaultValue;
      }
    });
  });

  return initialFormState;
};

export default getInitialFormState;
