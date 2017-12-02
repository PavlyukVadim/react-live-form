import React from 'react';

const Textarea = ({
  fieldConfig,
  fieldState,
  onChange
}) => (  
  <div className="form-group">
    <textarea
      onChange={onChange}
      value={fieldState.value}
    />
  </div>
);

export default Textarea;
