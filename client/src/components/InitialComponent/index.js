import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const InitialComponent = () => (
  <div>
    <ul>
      <li>
        <Link to='/user'>UserApp</Link>    
      </li>
      <li>
        <Link to='/admin'>AdminApp</Link>
      </li>
    </ul>
  </div>
);

export default InitialComponent;
