import React, { Component } from 'react';
import { Layout, Panel } from 'react-toolbox/lib';
import TestPage from './containers/TestPage';

class UserApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerActive: false,
    };
    this.toggleDrawerActive = this.toggleDrawerActive.bind(this);
  }

  toggleDrawerActive() {
    this.setState(prevState => ({
      drawerActive: !prevState.drawerActive,
    }));
  }

  render() {
    return (
      <Layout>
        <Panel>
          <div className="container">
            <h1>Main Content</h1>
            <p>Main content goes here.</p>
            <TestPage status="new" />
          </div>
        </Panel>
      </Layout>
    );
  }
}

export default UserApp;
