import React from 'react';

const Textarea = ({
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

  return (
    <div className="form-group row">
      <label className="form-label col-xxxs-6" htmlFor={name}>
        {title}
      </label>
      <textarea
        className="form-textarea col-xxxs-6"
        id={name}
        value={value}
        onChange={(e) => onChangeFormField(fieldConfig, 'value', e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};

export default Textarea;
