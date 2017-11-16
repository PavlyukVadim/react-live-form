import React from 'react';

const Input = ({
  fieldConfig,
  fieldState,
  onChange
}) => (
  <div className="form-group">
    <input
      className="form-input"
      type="text"
      name={fieldConfig.name}
      maxLength={16}
      label={fieldConfig.title}
      value={fieldState.value}
      onChange={onChange}
    />
    <label className="form-label">{`${fieldConfig.title} = ${fieldConfig.state && fieldConfig.state.value}`}</label>
  </div>
);

export default Input;
