import React from 'react';

const Textarea = ({
  fieldConfig,
  fieldState,
  changeFormField,
}) => (
  <div className="form-group row">
    <label className="form-label col-xxxs-6" htmlFor={fieldConfig.name}>
      {fieldConfig.title}
    </label>
    <textarea
      className="form-textarea col-xxxs-6"
      id={fieldConfig.name}
      value={fieldState.value}
      onChange={(e) => changeFormField(fieldConfig.name, 'value', e.target.value)}
      disabled={fieldState.disabled}
    />
  </div>
);

export default Textarea;
