import React, { Component } from 'react';
import './VetClinic.css'; //Global css
import Header from './components/Header/Header';
import Owner from './components/Forms/Owner';

export class VetClinic extends Component {
  render() {
    return (
      <div className='App'>
        <Header />
        <Owner />
      </div>
    );
  }
}

export default VetClinic;
