import React from 'react';

const Textarea = ({
  fieldConfig,
  fieldState,
  changeFormField
}) => (  
  <div className="form-group">
    <textarea
      onChange={(e) => changeFormField(fieldConfig.name, 'value', e.target.value)}
      value={fieldState.value}
    />
  </div>
);

export default Textarea;
