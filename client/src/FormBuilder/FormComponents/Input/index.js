import React from 'react';

const Input = ({
  fieldConfig,
  fieldState,
  changeFormField
}) => (
  <div className="form-group">
    <input
      className="form-input"
      type="text"
      name={fieldConfig.name}
      maxLength={16}
      label={fieldConfig.title}
      value={fieldState.value}
      onChange={(e) => changeFormField(fieldConfig.name, 'value', e.target.value)}
    />
    <label className="form-label">{`${fieldConfig.title} = ${fieldConfig.state && fieldConfig.state.value}`}</label>
  </div>
);

export default Input;
