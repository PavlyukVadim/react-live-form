import React, { Component } from 'react';
import Welcome from './../../components/Welcome';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      statsData: {},
    };
    this.goToCreateTest = this.goToCreateTest.bind(this);
  }

  componentDidMount() {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr',
      'May', 'Jun', 'Jul', 'Aug',
      'Sep', 'Oct', 'Nov', 'Dec'
    ];

    fetch('http:/\/localhost:4000/stats')
      .then((response) => response.json())
      .then((data) => {
        const newData = [];
        for (let month of months) {
          newData.push({name: month});
        }

        for (let dataByYear of data) {
          const year = dataByYear.year;
          for (let item of newData) {
            const month = item.name;
            item[year] = dataByYear[month];
          }
        }
        this.setState({statsData: newData});
      });
  }

  goToCreateTest() {
    this.props.history.push('/admin/test/new');
  }

  render() {
    return(
      <div>
        <Welcome
          statsData={this.state.statsData}
          goToCreateTest={this.goToCreateTest}
        />
      </div>
    )
  }
}

export default Dashboard;
