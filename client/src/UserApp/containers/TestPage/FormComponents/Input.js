import React from 'react';

const Input = ({
  field,
  value,
  onChange
}) => (
  <div className="form-group">
    <input
      className="form-input"
      type="text"
      name={field.name}
      maxLength={16}
      label={field.title}
      value={value}
      onChange={onChange}
    />
    <label className="form-label">{`${field.title} = ${field.state && field.state.value}`}</label>
  </div>
);

export default Input;
