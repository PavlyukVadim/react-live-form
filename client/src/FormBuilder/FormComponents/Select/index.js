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
        className="form-select col-sm-6"
        name={fieldConfig.name}
        value={fieldState.value}
        multiple={true}
        onChange={(e) => onChange(e.target)}
        disabled={fieldState.disabled}
      >
        {props.children}
      </select>
    );
  } else {
    return (
      <select
        className="form-select col-sm-6"
        name={fieldConfig.name}
        value={fieldState.value}
        onChange={(e) => onChange(e.target)}
        disabled={fieldState.disabled}
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
    <div className="form-group row">
      <label className="form-label col-sm-6">{fieldConfig.title}</label>
      <SelectByType
        fieldConfig={fieldConfig}
        fieldState={fieldState}
        onChange={onChange}
      >
        {
          fieldConfig.options &&
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
    </div>
  );
};

export default Select;
