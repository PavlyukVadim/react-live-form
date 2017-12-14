import React from 'react';

const Textarea = ({
  fieldConfig,
  fieldState,
  changeFormField
}) => (
  <div className="form-group row">
    <label className="form-label col-sm-6">{fieldConfig.title}</label>
    <textarea
      className="form-textarea col-sm-6"
      value={fieldState.value}
      onChange={(e) => changeFormField(fieldConfig.name, 'value', e.target.value)}
      disabled={fieldState.disabled}
    />
  </div>
);

export default Textarea;
