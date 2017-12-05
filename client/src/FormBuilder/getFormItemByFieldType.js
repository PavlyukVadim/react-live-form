import React, { Component } from 'react';
import Input from './FormComponents/Input';
import Select from './FormComponents/Select';
import Textarea from './FormComponents/Textarea';
import Checkbox from './FormComponents/Checkbox';
import OptionsSetter from './FormComponents/OptionsSetter';
import StateSetter from './FormComponents/StateSetter';

const kvArray = [
  ['input', Input],
  ['select', Select],
  ['textarea', Textarea],
  ['checkbox', Checkbox],
  ['options', OptionsSetter],
  ['state', StateSetter],
];

const formItemsMap = new Map(kvArray);

const getFormItemByFieldType = (fieldType) => {
  return formItemsMap.get(fieldType);
};

export default getFormItemByFieldType;
