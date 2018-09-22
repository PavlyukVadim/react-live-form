import updateFieldByValueExpr from './updateFieldByValueExpr';
import updateFieldByValueFn from './updateFieldByValueFn';

const getFieldUpdateFunctionMap = new Map([
  ['valueExpr', updateFieldByValueExpr],
  ['valueFn', updateFieldByValueFn],
]);

const getFieldUpdateFunction = (typeOfCalculatedFields) => (
  getFieldUpdateFunctionMap.get(typeOfCalculatedFields)
);

export default getFieldUpdateFunction;
