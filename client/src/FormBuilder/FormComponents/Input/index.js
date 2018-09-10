import React from 'react';

const Input = ({
  fieldConfig,
  fieldState,
  changeFormField,
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
      onChange={(e) => changeFormField(fieldConfig.name, 'value', e.target.value)}
      disabled={fieldState.disabled}
    />
  </div>
);

export default Input;
