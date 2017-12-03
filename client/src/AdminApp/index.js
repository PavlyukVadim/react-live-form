import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {
  AppBar,
  Checkbox,
  IconButton,
  Layout,
  NavDrawer,
  Panel,
  Sidebar
} from 'react-toolbox';
import TestsList from './containers/TestsList';
import TestPage from './containers/TestPage';

class AdminApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerActive: false,
    };
    this.toggleDrawerActive = this.toggleDrawerActive.bind(this);
  }

  toggleDrawerActive() {
    this.setState((prevState) => {
      return {
        drawerActive: !prevState.drawerActive,
      };
    });
  };

  render() {
    return (
      <Layout>
        <NavDrawer
          active={this.state.drawerActive}
          onOverlayClick={this.toggleDrawerActive}
          permanentAt='xxxl'
        >
          <p>
            Navigation, account switcher, etc. go here.
          </p>
        </NavDrawer>
        <Panel>
          <AppBar leftIcon='menu' onLeftIconClick={this.toggleDrawerActive} />
          <div className="container">
            <h1>Main Content</h1>
            <p>Main content goes here.</p>
            <Route
              path='/admin'
              exact
              render={
                () => (
                  <TestsList 
                    history={this.props.history}
                    path={this.props.match.path}
                  />
                )
              }
            />
            <Route
              path='/admin/test/:id'
              render={
                () => (
                  <TestPage/>
                )
              }
            />
            <Route
              path='/admin/test/new'
              render={
                () => (
                  <CreateTest/>
                )
              }
            />
          </div>
        </Panel>
      </Layout>
    );
  }
}

export default AdminApp;
