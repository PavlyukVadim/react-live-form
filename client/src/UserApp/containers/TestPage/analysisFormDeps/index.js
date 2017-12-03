import { Parser } from 'expr-eval';
import addSubscriberNameToField from './../addSubscriberNameToField';
import addUpdateFunction from './../addUpdateFunction';

const parser = new Parser({
  operators: {
    'in': true,
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
  for (const field of fields) {
    const fieldName = field.name;
    const formElement = formElements[fieldName] || {};
    const isFieldHasOwnState = field.state && Object.keys(field.state).length > 0;

    if (isFieldHasOwnState) {
      const fieldState = field.state;
      const fieldStateProps = Object.keys(fieldState);
      fieldStateProps.map((propName) => {
        const propValue = fieldState[propName];
        const expr = parser.parse(propValue);
        const parents = expr.variables();
        parents.map((parentName) => {
          if (!formElements[parentName]) {
            formElements[parentName] = {};
          }
          addSubscriberNameToField(formElements[parentName], fieldName);
        });

        addUpdateFunction(
          formElement,
          context,
          parents,
          expr,
          fieldName,
          propName
        );
      });

      const update = () => {
        for (const updateFunction of formElement.updateFunctions) {
          updateFunction();
        }
      };
      formElement.update = update;
    }
    formElements[fieldName] = formElement;
  }
  return formElements;
};

export default analysisFormDeps;
