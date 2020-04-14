import React, { Component } from 'react';
import './VetClinic.css'; //Global css
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Home from './components/Home/Home';
import Owner from './components/Forms/Owner';
import Patients from './components/Forms/ActivePatients';

export class VetClinic extends Component {
  render() {
    return (
      <Router>
        <Route path='/' exact strict component={Home} />
        <Route path='/owners' exact strict component={Owner} />
        <Route path='/patients' exact strict component={Patients} />
      </Router>
    );
  }
}

export default VetClinic;
