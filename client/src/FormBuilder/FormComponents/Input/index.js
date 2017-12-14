import React from 'react';

const Input = ({
  fieldConfig,
  fieldState,
  changeFormField
}) => (
  <div className="form-group row">
    <label className="form-label col-sm-6">{fieldConfig.title}</label>
    <input
      className="form-input col-sm-6"
      type="text"
      name={fieldConfig.name}
      maxLength={16}
      label={fieldConfig.title}
      value={fieldState.value}
      onChange={(e) => changeFormField(fieldConfig.name, 'value', e.target.value)}
      disabled={fieldState.disabled}
    />
  </div>
);

export default Input;
