const getDataSourceValue = (
  dataSource,
  componentName,
  propName,
  typeOfValue,
) => {
  const componentProps = dataSource[componentName];
  if (!componentProps) {
    console.error(`dataSource doesn't include component ${componentName}`);
    return null;
  }
  const prop = componentProps[propName];
  if (!prop) {
    console.error(`component ${componentName} doesn't include prop ${propName}`);
    return null;
  }
  const value = prop[typeOfValue];
  return value;
};

export default getDataSourceValue;
