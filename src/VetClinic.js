import React, { Component } from 'react';
import './VetClinic.css'; //Global css
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import OwnerForm from './components/Forms/Owner';
import OwnerDashboard from './components/Home/OwnerDashboard';
import PatientDashboard from './components/Home/ActivePatientDashboard';
import Patients from './components/Forms/ActivePatients';
import Navbar from './components/NavBar/NavBar';
import { Provider } from 'react-redux';
import store from './store/store';

export class VetClinic extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <Route path='/' exact strict component={Home} />
          <Route path='/owner/:ownerId' exact strict component={OwnerForm} />
          <Route
            path='/owners-dashboard'
            exact
            strict
            component={OwnerDashboard}
          />
          <Route path='/patients' exact strict component={Patients} />
          <Route
            path='/patients-dashboard'
            exact
            strict
            component={PatientDashboard}
          />
        </Router>
      </Provider>
    );
  }
}

export default VetClinic;
