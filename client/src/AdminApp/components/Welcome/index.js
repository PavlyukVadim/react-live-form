import React, { Component } from 'react';
import {
  Button,
  Tooltip,
} from 'react-toolbox';
import './Welcome.scss';

const TooltipButton = Tooltip(Button);

const Welcome = ({goToCreateTest}) => {
  return (
    <div className="row">
      <TooltipButton
        className="addTest-btn"
        onClick={goToCreateTest}
        icon='add'
        floating
        primary
        tooltip='Create new test'
      />
    </div>
  );
};

export default Welcome;
