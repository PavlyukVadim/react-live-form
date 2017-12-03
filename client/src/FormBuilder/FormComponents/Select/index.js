import React from 'react';

const SelectByType = (props) => {
  const {
    fieldConfig,
    fieldState,
    onChange
  } = props;
  
  if (fieldConfig.multiple) {
    return (
      <select
        className="form-select"
        name={fieldConfig.name}
        value={fieldState.value}
        multiple={true}
        onChange={(e) => onChange(e.target)}
      >
        {props.children}
      </select>
    );
  } else {
    return (
      <select
        className="form-select"
        name={fieldConfig.name}
        value={fieldState.value}
        onChange={(e) => onChange(e.target)}
      >
        {props.children}
      </select>
    );
  }
};

const Select = ({
  fieldConfig,
  fieldState,
  changeFormField
}) => {
  const onChange = (target) => {
    let value;
    if (!fieldConfig.multiple) {
      value = target.value;
    } else {
      value = [];
      const options = target.options;
      for (let i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
    }
    changeFormField(fieldConfig.name, 'value', value);
  };

  return (
    <div className="form-group">
      <SelectByType
        fieldConfig={fieldConfig}
        fieldState={fieldState}
        onChange={onChange}
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
      </SelectByType>
      <label className="form-label">
        {`${fieldConfig.title} = ${fieldConfig.state && fieldConfig.state.value}`}
      </label>
    </div>
  );
};

export default Select;
