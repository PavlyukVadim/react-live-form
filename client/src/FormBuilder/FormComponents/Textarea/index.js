import React from 'react';

const Textarea = ({
  fieldConfig,
  fieldState,
  changeFormField
}) => (
  <div className="form-group">
    <textarea
      value={fieldState.value}
      onChange={(e) => changeFormField(fieldConfig.name, 'value', e.target.value)}
      disabled={fieldState.disabled}
    />
  </div>
);

export default Textarea;
