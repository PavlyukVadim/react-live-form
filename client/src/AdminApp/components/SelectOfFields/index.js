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
    <div className="row">
      <label className="col-sm-6">Select field:</label>
      <select
        className="col-sm-6"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options}
      </select>
    </div>
  );
};

export default SelectOfFields;
