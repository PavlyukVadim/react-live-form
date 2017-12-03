import changeFormField from './../changeFormField';

const addUpdateFunction = (
  formElement,
  context,
  parents,
  updateExpr,
  fieldName,
  propName
) => {
  const updateFunction = () => {
    const variablesValues = {};
    parents.map((parentName) => {
      variablesValues[parentName] = context.state[parentName].value;
    });
    const newPropValue = updateExpr.evaluate(variablesValues);
    changeFormField(context, fieldName, propName, newPropValue);
  };

  if (formElement.updateFunctions) {
    formElement.updateFunctions.push(updateFunction);
  } else {
    formElement.updateFunctions = [updateFunction];
  }
};

export default addUpdateFunction;
