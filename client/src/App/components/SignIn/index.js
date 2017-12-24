import React from 'react';
import Input from 'react-toolbox/lib/input';
import {
  Button,
  IconButton
} from 'react-toolbox/lib/button';
import './signIn.scss';

const SignIn = ({
  userName,
  password,
  changeValue,
  onSubmit,
  isError,
}) => {
  return (
    <div className="signIn-wrapper">
      <div className="signIn-column">
        <h1 className="title">Sign In</h1>
        <Input
          type='mail'
          label='Name'
          name='name'
          error={isError && <span>User doesn't exist!!</span>}
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

export default SignIn;
