import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, ActivePatientDashboard, OwnerDashboard } from './components/Dashboards';
import { Owner, Patient } from './components/Forms';
import Navbar from './components/NavBar/NavBar';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './store/store';
import { initializeIcons } from '@uifabric/icons';
import { Link } from 'react-router-dom';

import './VetClinic.scss';

const ErrorPage = () => {
  return (
    <div>
      <div className='fourOfour-container'>
        404 <span className='fourOfour-subtitle-container'>Page Not Found</span>
      </div>
      <div className='bg_image' />
      <div className='link'>
        <Link to='/'>Back to Home</Link>
      </div>
    </div>
  );
};

const VetClinic = () => {
  initializeIcons();
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact strict component={Home} />
          <Route path='/owner/:ownerId' exact strict component={Owner} />
          <Route
            path='/owners-dashboard'
            exact
            strict
            component={OwnerDashboard}
          />
          <Route
            path='/owner/:ownerId/patient/:patientId'
            exact
            strict
            component={Patient}
          />
          <Route
            path='/patients-dashboard'
            exact
            strict
            component={ActivePatientDashboard}
          />
          <Route component={ErrorPage}></Route>
        </Switch>
        <ToastContainer />
      </Router>
    </Provider>
  );
};

export default VetClinic;
