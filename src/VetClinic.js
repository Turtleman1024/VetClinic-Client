import React from 'react';
import './VetClinic.css'; //Global css
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import OwnerForm from './components/Forms/Owner';
import Patient from './components/Forms/Patient';
import OwnerDashboard from './components/Home/OwnerDashboard';
import PatientDashboard from './components/Home/ActivePatientDashboard';
import Navbar from './components/NavBar/NavBar';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './store/store';
import { initializeIcons } from '@uifabric/icons';

const VetClinic = () => {
  initializeIcons();
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
        <Route path='/patient/:patientId' exact strict component={Patient} />
        <Route
          path='/patients-dashboard'
          exact
          strict
          component={PatientDashboard}
        />
        <ToastContainer />
      </Router>
    </Provider>
  );
};

export default VetClinic;
