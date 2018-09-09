import React, { Component } from 'react';
import {
  Button,
  Tooltip,
} from 'react-toolbox/lib';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as T,
  Legend
} from 'recharts';
import {
  List,
  ListItem,
  ListSubHeader,
  ListCheckbox
} from 'react-toolbox/lib/list';
import javascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locales/en'
import 'javascript-time-ago/intl-messageformat-global'
import 'intl-messageformat/dist/locale-data/en';
javascriptTimeAgo.locale(en)
const timeAgoEnglish = new javascriptTimeAgo('en-US');

import './Welcome.scss';

const TooltipButton = Tooltip(Button);

const Welcome = ({
  lastPassage,
  statsData,
  goToCreateTest
}) => {

  const list = lastPassage.map((test) => {
    return (
     <ListItem
        key={test.title}
        caption={test.title}
        legend={`${timeAgoEnglish.format(new Date(test.passage_date))} by ${test.name}`}
      />
    );
  });

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
      <div className="row" style={{margin: '50px'}}>
        <h4>Time of last passages of lets: </h4>
        <List selectable ripple>
          {list}
        </List>
      </div>
    </div>
  );
};

export default Welcome;
