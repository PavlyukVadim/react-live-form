import React from 'react';

const Input = ({
  fieldConfig,
  fieldState,
  onChangeFormField,
}) => {
  const {
    name,
    props = {},
  } = fieldConfig;

  const { title } = props;
  const {
    value,
    disabled,
  } = fieldState;

  console.log('fieldConfig', fieldConfig);
  console.log('fieldState', fieldState);

  return (
    <div className="form-group row">
      <label className="form-label col-xxxs-6" htmlFor={name}>
        {title}
      </label>
      <input
        className="form-input col-xxxs-6"
        type="text"
        id={name}
        name={name}
        maxLength={50}
        label={title}
        value={value}
        onChange={(e) => onChangeFormField(fieldConfig, 'value', e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
