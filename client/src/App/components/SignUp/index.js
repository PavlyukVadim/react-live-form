import React from 'react';
import Input from 'react-toolbox/lib/input';
import {
  Button,
  IconButton
} from 'react-toolbox/lib/button';
import './SignUp.scss';

const SignUp = ({
  userName,
  password,
  changeValue,
  onSubmit,
}) => {
  return (
    <div className="SignUp-wrapper">
      <div className="SignUp-column">
        <h1 className="title">Sign Up</h1>
        <Input
          type='mail'
          label='Name'
          name='name'
          value={userName}
          onChange={(value) => changeValue('userName', value)}
          maxLength={16}
        />
        <Input
          type='password'
          label='Password'
          name='password'
          value={password}
          onChange={(value) => changeValue('password', value)}
          maxLength={16}
        />
        <Button
          className="send-btn"
          onClick={onSubmit}
          label='Send'
          flat
          primary
        />
      </div>
    </div>
  );
};

export default SignUp;
