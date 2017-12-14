import React from 'react';

const Checkbox = ({
  fieldConfig,
  fieldState,
  changeFormField
}) => {
  const onChange = (target) => {
    const value = target.checked;
    changeFormField(fieldConfig.name, 'value', value);
  };

  return (
    <div className="form-group">
      <input
        type="checkbox"
        id={`checkbox-${fieldConfig.name}`}
        checked={fieldState.value}
        onChange={(e) => onChange(e.target)}
        disabled={fieldState.disabled}
      />
      <label htmlFor={`checkbox-${fieldConfig.name}`}>
        {fieldConfig.title}
      </label>
    </div>
  );
};

export default Checkbox;
