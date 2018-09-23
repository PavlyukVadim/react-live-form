import React from 'react';

const SelectByType = (props) => {
  const {
    fieldConfig,
    id,
    fieldState,
    onChange,
    children,
  } = props;

  if (fieldConfig.multiple) {
    return (
      <select
        id={id}
        className="form-select col-xxxs-6"
        name={fieldConfig.name}
        value={fieldState.value}
        multiple
        onChange={(e) => onChange(e.target)}
        disabled={fieldState.disabled}
      >
        {children}
      </select>
    );
  }
  return (
    <select
      id={id}
      className="form-select col-xxxs-6"
      name={fieldConfig.name}
      value={fieldState.value}
      onChange={(e) => onChange(e.target)}
      disabled={fieldState.disabled}
    >
      {children}
    </select>
  );
};

const Select = ({
  fieldConfig,
  fieldState,
  changeFormField,
}) => {
  const onChange = (target) => {
    let newValue;
    if (!fieldConfig.multiple) {
      newValue = target.value;
    } else {
      newValue = [];
      const { options } = target;
      options.forEach((option) => {
        if (option.selected) {
          newValue.push(option.value);
        }
      });
    }
    changeFormField(fieldConfig.name, 'value', newValue);
  };

  return (
    <div className="form-group row">
      <label className="form-label col-xxxs-6" htmlFor={fieldConfig.name}>
        {fieldConfig.title}
      </label>
      <SelectByType
        id={fieldConfig.name}
        fieldConfig={fieldConfig}
        fieldState={fieldState}
        onChange={onChange}
      >
        {
          fieldConfig.options &&
          fieldConfig.options.map(option => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.content}
            </option>
          ))
        }
      </SelectByType>
    </div>
  );
};

export default Select;
