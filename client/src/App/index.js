import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import InitialComponent from './../components/InitialComponent';
import AdminApp from './../AdminApp';
import UserApp from './../UserApp';

const App = () => (
  <div>
    <Route path='/' exact component={InitialComponent}/>
    <Route path='/admin' component={AdminApp}/>
    <Route path='/user' component={UserApp}/>
  </div>
);

export default App;
