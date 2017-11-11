import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import InitialComponent from './../components/InitialComponent';
import AdminApp from './../AdminApp';

const App = () => (
  <div>
    <Route path='/' exact component={InitialComponent}/>
    <Route path='/admin' component={AdminApp}/>
  </div>
);

export default App;
