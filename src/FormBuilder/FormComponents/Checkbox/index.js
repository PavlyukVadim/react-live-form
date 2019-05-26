import React from 'react';

const Checkbox = ({
  fieldConfig,
  fieldState,
  onChangeFormField,
}) => {
  const onChange = (target) => {
    const value = target.checked;
    onChangeFormField(fieldConfig, 'value', value);
  };

  const {
    name,
    props = {},
  } = fieldConfig;

  const { title } = props;
  const {
    value,
    disabled,
  } = fieldState;

  return (
    <div className="form-group checkbox-group row">
      <label className="col-xxxs-6" htmlFor={`checkbox-${name}`}>
        {title}
      </label>
      <input
        type="checkbox"
        id={`checkbox-${name}`}
        checked={value}
        onChange={(e) => onChange(e.target)}
        disabled={disabled}
      />
    </div>
  );
};

export default Checkbox;
