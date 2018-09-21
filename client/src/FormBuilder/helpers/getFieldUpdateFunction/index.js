import changeFormField from '../changeFormField';

const getFieldUpdateFunction = (
  formElement,
  context,
  parents,
  updateExpr,
  fieldName,
  propName,
) => {
  // const updateFunction = () => {
  //   const variablesValues = {};
  //   parents.forEach((parentName) => {
  //     variablesValues[parentName] = context.state[parentName].value;
  //   });
  //   const newPropValue = updateExpr.evaluate(variablesValues);
  //   changeFormField(context, fieldName, propName, newPropValue);
  // };
  //
  // return updateFunction;
};

export default getFieldUpdateFunction;
