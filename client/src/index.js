import React from 'react';
import ReactDOM from 'react-dom';
import TestPage from './TestPage';
import './stylesheets/normalize.css';
import './stylesheets/main.scss';

ReactDOM.render(
  <TestPage />,
  document.querySelector('#root'),
);
