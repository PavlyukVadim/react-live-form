import React, { Component } from 'react';

const SelectOfFields = ({
  fields,
}) => {
  return (
    <select>
      {
        fields.map(option => {
          return (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          );
        })
      }
    </select>
  );
};

export default SelectOfFields;
