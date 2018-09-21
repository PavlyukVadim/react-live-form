import React from 'react';

const Input = ({
  fieldConfig,
  fieldState,
  onChangeFormField,
}) => (
  <div className="form-group row">
    <label className="form-label col-xxxs-6" htmlFor={fieldConfig.name}>
      {fieldConfig.title}
    </label>
    <input
      className="form-input col-xxxs-6"
      type="text"
      id={fieldConfig.name}
      name={fieldConfig.name}
      maxLength={50}
      label={fieldConfig.title}
      value={fieldState.value}
      onChange={(e) => onChangeFormField(fieldConfig, 'value', e.target.value)}
      disabled={fieldState.disabled}
    />
  </div>
);

export default Input;
