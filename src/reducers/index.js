import { combineReducers } from 'redux';
import vetClinicReducer from './vetClinicReducer';

export default combineReducers({ vetClinic: vetClinicReducer });
