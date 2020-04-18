import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';

export class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <NavBar />
        <h1>Welcome to Home Page</h1>
      </div>
    );
  }
}

export default Home;
