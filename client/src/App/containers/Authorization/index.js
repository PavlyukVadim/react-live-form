import React, { Component } from 'react';
import SignIn from './../../components/SignIn';

class Authorization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    };
    this.changeValue = this.changeValue.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  changeValue(name, value) {
    this.setState({
      [name]: value,
    });
  }

  onSubmit() {
    const {
      userName,
      password
    } = this.state;
    if (userName === 'user') {
      window.localStorage.setItem('rr_login', userName);
      this.props.history.push('user');
    } else if (userName === 'admin') {
      window.localStorage.setItem('rr_login', userName);
      this.props.history.push('admin');
    }
  }

	render() {
    return (
      <SignIn
        {...this.state}
        changeValue={this.changeValue}
        onSubmit={this.onSubmit}
      />
    );  
  }
}

export default Authorization;
