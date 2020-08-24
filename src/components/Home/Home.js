import React, { Component } from 'react';
import ActivePatients from './ActivePatientDashboard';

export class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Welcome to Home Page</h1>
        <ActivePatients isHomePage={true} />
      </div>
    );
  }
}

export default Home;
