import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Layout,
  Panel,
  Navigation,
} from 'react-toolbox/lib';
import './welcome.scss';

const InitialComponent = () => (
  <Layout>
    <Panel>
      <AppBar title="Testing System" leftIcon='check'>
        <Navigation type="horizontal">
          <Link className="identification-link" to='/signin'>Sign In</Link>
          <Link className="identification-link" to='/signup'>Sign Up</Link>
        </Navigation>
      </AppBar>
      <div className="container">
        <h1>Hi! Welcome to Testing System</h1>
        <p>Main content for admin goes here.</p>
      </div>
    </Panel>
  </Layout>
);

export default InitialComponent;
