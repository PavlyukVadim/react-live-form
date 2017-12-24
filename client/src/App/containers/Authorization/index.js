import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import SignIn from './../../components/SignIn';

class Authorization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      isError: false,
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

    this.props.data.refetch({
      name: userName,
    }).then((result) => {
      console.log('result', result);
      if (!result.data.error && result.data.userByName.user_id) {
        const userId = result.data.userByName.user_id;
        const roleId = result.data.userByName.role_id;
        
        window.localStorage.setItem('rr_userId', userId);
        window.localStorage.setItem('rr_roleId', roleId);

        if (roleId === '1') {
          this.props.history.push('user');
        } else {
          this.props.history.push('admin');
        }
      } else {
        this.setState({isError: true});
      }
    });
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

// export default Authorization;

const UserByName = gql`
  query UserByName($name: String) {
    userByName(name: $name) {
      user_id,
      name,
      role_id
    }
  }
`;

const AuthorizationWithData = graphql(UserByName, {
  options: {
    variables: {
      name: '',
    },
  },
})(Authorization);

export default AuthorizationWithData;
