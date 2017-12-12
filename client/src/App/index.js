import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import InitialComponent from './components/InitialComponent';
import AdminApp from './../AdminApp';
import UserApp from './../UserApp';
import Authorization from './containers/Authorization';
// import Authorization from './containers/Authorization';

const App = () => (
  <div>
    <Route path='/' exact component={InitialComponent} />
    <Route path='/signin' exact component={Authorization} />
    <Route path='/admin' component={AdminApp} />
    <Route path='/user' component={UserApp} />
  </div>
);

export default App;
