import React from 'react';

const Select = ({
  fieldConfig,
  fieldState,
  onChange
}) => (  
  <div className="form-group">
    <select
      name={fieldConfig.name}
      value={fieldState.value}
      onChange={onChange}
      className="form-select"
    >
      {
        fieldConfig.options.map(option => {
          return (
            <option
              key={option.value}
              value={option.value}
            >
              {option.content}
            </option>
          );
        })
      }
    </select>
    <label className="form-label">
      {`${fieldConfig.title} = ${fieldConfig.state && fieldConfig.state.value}`}
    </label>
  </div>
);

export default Select;
