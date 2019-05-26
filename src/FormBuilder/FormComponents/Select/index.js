import React from 'react';

const SelectByType = ({
  fieldConfig,
  id,
  fieldState,
  onChange,
  children,
}) => {
  const {
    name,
    props = {},
  } = fieldConfig;

  const { multiple } = props;

  const {
    value,
    disabled,
  } = fieldState;

  return (
    <select
      id={id}
      className="form-select col-xxxs-6"
      name={name}
      value={value}
      multiple={multiple}
      onChange={(e) => onChange(e.target)}
      disabled={disabled}
    >
      {children}
    </select>
  );
};

const Select = ({
  fieldConfig,
  fieldState,
  onChangeFormField,
}) => {
  const {
    name,
    props = {},
  } = fieldConfig;

  const {
    title,
    options = [],
    multiple,
  } = props;

  const onChange = (target) => {
    let newValue;
    if (!multiple) {
      newValue = target.value;
    } else {
      newValue = [];
      const { options: targetOptions } = target;
      Array.from(targetOptions).forEach((option) => {
        if (option.selected) {
          newValue.push(option.value);
        }
      });
    }
    onChangeFormField(fieldConfig, 'value', newValue);
  };

  return (
    <div className="form-group select-group row">
      <label className="form-label col-xxxs-6" htmlFor={name}>
        {title}
      </label>
      <SelectByType
        id={name}
        fieldConfig={fieldConfig}
        fieldState={fieldState}
        onChange={onChange}
      >
        {
          options.map((option) => (
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
