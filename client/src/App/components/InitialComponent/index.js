import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const InitialComponent = () => (
  <div>
    <ul>
      <li>
        <Link to='/signin'>SignIn</Link>    
      </li>
      <li>
        <Link to='/signup'>SignUp</Link>
      </li>
    </ul>
  </div>
);

export default InitialComponent;
