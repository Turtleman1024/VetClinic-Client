import React, { Component } from 'react';
import './VetClinic.css'; //Global css
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Home from './components/Home/Home';
import Owner from './components/Home/Owner';
import Patients from './components/Forms/ActivePatients';
import { Provider } from 'react-redux';
import store from './store/store';

export class VetClinic extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route path='/' exact strict component={Home} />
          <Route path='/owners' exact strict component={Owner} />
          <Route path='/patients' exact strict component={Patients} />
        </Router>
      </Provider>
    );
  }
}

export default VetClinic;
