import React, { Component } from 'react';
import Welcome from './../../components/Welcome';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.goToCreateTest = this.goToCreateTest.bind(this);
  }

  goToCreateTest() {
    this.props.history.push('/admin/test/new');
  }

  render() {
    return(
      <div>
        <Welcome
          goToCreateTest={this.goToCreateTest}
        />
      </div>
    )
  }
}

export default Dashboard;
