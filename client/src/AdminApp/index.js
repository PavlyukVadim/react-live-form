import React, { Component } from 'react';
import { Route } from 'react-router-dom';
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
import AdminAppRouter from './adminAppRouter';

class AdminApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerActive: false,
    };
    this.toggleDrawerActive = this.toggleDrawerActive.bind(this);
    this.goToPage = this.goToPage.bind(this);
  }

  componentWillMount() {
    const login = window.localStorage.getItem('rr_login');
    if (login !== 'admin') {
      this.props.history.push('/');
    }
  }

  toggleDrawerActive() {
    this.setState((prevState) => {
      return {
        drawerActive: !prevState.drawerActive,
      };
    });
  };

  goToPage(page) {
    this.props.history.push(`/admin${page}`);
    this.toggleDrawerActive();
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
              caption='Create test'
              onClick={() => this.goToPage('')}
              leftIcon='add_box'
            />
            <ListItem
              caption='Passed tests'
              onClick={() => this.goToPage('/passed')}
              leftIcon='undo'
            />
            <ListItem
              caption='Assessed tests'
              onClick={() => this.goToPage('/assessed')}
              leftIcon='assessment'
            />
          </List>
        </NavDrawer>
        <Panel>
          <AppBar leftIcon='menu' onLeftIconClick={this.toggleDrawerActive} />
          <div className="container">
            <h1>Main Content</h1>
            <p>Main content for admin goes here.</p>
            <AdminAppRouter
              history={history}
              match={match}
            />
          </div>
        </Panel>
      </Layout>
    );
  }
}

export default AdminApp;
