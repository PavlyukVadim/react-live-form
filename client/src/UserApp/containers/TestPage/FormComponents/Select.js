import React from 'react';

const Select = ({
  fieldConfig,
  fieldState,
  onChange
}) => (  
  <div className="form-group">
    <select
      name={fieldConfig.name}
      value={fieldConfig.selectedOption}
      onChange={onChange}
      className="form-select"
    >
      {
        fieldConfig.options.map(opt => {
          return (
            <option
              key={opt}
              value={opt}
            >
              {opt}
            </option>
          );
        })
      }
    </select>
  </div>
);

export default Select;
