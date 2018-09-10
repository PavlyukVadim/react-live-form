import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Checkbox,
  IconButton,
  Layout,
  NavDrawer,
  Panel,
  Sidebar,
  Navigation,
  List,
  ListItem,
} from 'react-toolbox/lib';
import TestPage from './containers/TestPage';

class UserApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerActive: false,
    };
    this.toggleDrawerActive = this.toggleDrawerActive.bind(this);
    this.goToPage = this.goToPage.bind(this);
  }

  toggleDrawerActive() {
    this.setState((prevState) => {
      return {
        drawerActive: !prevState.drawerActive,
      };
    });
  };

  goToPage(page) {
    this.props.history.push(`/user${page}`);
    this.toggleDrawerActive();
  };

  render() {
    const {
      history,
      match,
    } = this.props;

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
