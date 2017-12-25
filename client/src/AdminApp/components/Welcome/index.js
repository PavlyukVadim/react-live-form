import React, { Component } from 'react';
import {
  Button,
  Tooltip,
} from 'react-toolbox';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as T,
  Legend
} from 'recharts';
import './Welcome.scss';

const TooltipButton = Tooltip(Button);

const Welcome = ({
  statsData,
  goToCreateTest
}) => {
  return (
    <div className="row">
      <div className="row">
        <h4>Number of users registrations by last 3 years: </h4>
      </div>
      <LineChart
        width={600} height={300} data={statsData}
        margin={{top: 25, right: 30, left: 20, bottom: 5}}
      >
        <XAxis dataKey="name"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <T/>
        <Legend />
        <Line type="monotone" dataKey="2017" stroke="#fb3425" activeDot={{r: 8}}/>
        <Line type="monotone" dataKey="2016" stroke="#82ca9d" />
        <Line type="monotone" dataKey="2015" stroke="#8884d8" />
      </LineChart>
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
