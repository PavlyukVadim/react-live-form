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
    <div className="form-group row">
      <label className="col-xxxs-6" htmlFor={`checkbox-${fieldConfig.name}`}>
        {fieldConfig.title}
      </label>
      <input
        type="checkbox"
        id={`checkbox-${fieldConfig.name}`}
        checked={fieldState.value}
        onChange={(e) => onChange(e.target)}
        disabled={fieldState.disabled}
      />
    </div>
  );
};

export default Checkbox;
