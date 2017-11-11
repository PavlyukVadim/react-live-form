import React, { Component } from 'react';
import { AppBar, Checkbox, IconButton } from 'react-toolbox';
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox';

class UserApp extends Component {
  
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
        <NavDrawer active={this.state.drawerActive}
                   permanentAt='xxxl'
                   onOverlayClick={this.toggleDrawerActive}
        >
          <p>
            Navigation, account switcher, etc. go here.
          </p>
        </NavDrawer>
        <Panel>
          <AppBar leftIcon='menu' onLeftIconClick={this.toggleDrawerActive} />
          <div>
            <h1>Main Content</h1>
            <p>Main content goes here.</p>
          </div>
        </Panel>
        <Sidebar pinned={this.state.sidebarPinned} width={5}>
          <div style={{ flex: 1 }}>
            <p>Supplemental content goes here.</p>
          </div>
        </Sidebar>
      </Layout>
    );
  }
}

export default UserApp;
