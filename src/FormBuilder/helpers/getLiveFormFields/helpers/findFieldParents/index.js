import findFieldParentsByValueExpr from './findFieldParentsByValueExpr';
import findFieldParentsByValueFn from './findFieldParentsByValueFn';

const findFieldParentsMap = new Map([
  ['valueExpr', findFieldParentsByValueExpr],
  ['valueFn', findFieldParentsByValueFn],
]);

const findFieldParents = (typeOfCalculatedFields) => (
  findFieldParentsMap.get(typeOfCalculatedFields)
);

export default findFieldParents;
