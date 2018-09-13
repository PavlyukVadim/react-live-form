import { Parser } from 'expr-eval';
import addFieldSubscriber from '../addFieldSubscriber';
import getFieldUpdateFunction from '../getFieldUpdateFunction';

const parser = new Parser({
  operators: {
    in: true,
  },
});
// const expr = parser.parse("x in arr");
// const res = expr.evaluate({
//   'x': 2,
//   'arr': [1, 2, 3]
// });
// console.log('res', res);

const analysisFormDeps = (context, fields) => {
  const formElements = {};
  fields.forEach((field) => {
    const fieldName = field.name;
    const formElement = formElements[fieldName] || {};
    const updateFunctions = [];
    const isFieldHasOwnState = field.state && Object.keys(field.state).length > 0;

    if (isFieldHasOwnState) {
      const fieldState = field.state;
      const fieldStateProps = Object.keys(fieldState);
      fieldStateProps.forEach((propName) => {
        const propValue = fieldState[propName];
        const expr = parser.parse(propValue);
        const parents = expr.variables();
        parents.forEach((parentName) => {
          if (!formElements[parentName]) {
            formElements[parentName] = {};
          }

          formElements[parentName].subscribers = addFieldSubscriber(
            formElements[parentName],
            fieldName,
          );
        });

        const updateFunction = getFieldUpdateFunction(
          formElement,
          context,
          parents,
          expr,
          fieldName,
          propName,
        );

        updateFunctions.push(updateFunction);
      });

      const update = () => {
        updateFunctions.forEach((updateFunction) => {
          updateFunction();
        });
      };
      formElement.update = update;
    }
    formElements[fieldName] = formElement;
  });
  return formElements;
};

export default analysisFormDeps;
