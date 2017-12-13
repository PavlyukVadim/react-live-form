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
} from 'react-toolbox';
import UserAppRouter from './userAppRouter';

const goToPage = (history, page) => (history.push(`/user${page}`));

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
    const {
      history,
      match,
    } = this.props;

    return (
      <Layout>
        <NavDrawer
          active={this.state.drawerActive}
          onOverlayClick={this.toggleDrawerActive}
          permanentAt='xxxl'
        >
          <List selectable ripple>
            <ListItem
              caption='New test'
              onClick={() => goToPage(history, '')}
              leftIcon='add_box'
            />
            <ListItem
              caption='Passed tests'
              onClick={() => goToPage(history, '/passed')}
              leftIcon='undo'
            />
            <ListItem
              caption='Assessed tests'
              onClick={() => goToPage(history, '/assessed')}
              leftIcon='assessment'
            />
          </List>
        </NavDrawer>
        <Panel>
          <AppBar
            leftIcon='menu'
            title="User cabinet"
            onLeftIconClick={this.toggleDrawerActive}
          >
            <Navigation type="horizontal">
              <Link className="identification-link" to='/signin'>Log out</Link>
            </Navigation>
          </AppBar>
          <div className="container">
            <h1>Main Content</h1>
            <p>Main content goes here.</p>
            <UserAppRouter
              history={history}
              match={match}
            />
          </div>
        </Panel>
      </Layout>
    );
  }
}

export default UserApp;
