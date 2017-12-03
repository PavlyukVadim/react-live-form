import React, { Component } from 'react';

const SelectOfFields = ({
  fields,
  value,
  onChange,
}) => {
  const options = fields.map(option => {
    return (
      <option
        key={option}
        value={option}
      >
        {option}
      </option>
    );
  });

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options}
    </select>
  );
};

export default SelectOfFields;
