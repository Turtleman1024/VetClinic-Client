import * as types from './types';

export function fetchActivePatients() {
  return { type: types.FETCH_ACTIVE_PATIENTS_START };
}

export function fetchPatientById(patientId) {
  return { type: types.FETCH_PATIENT_START, patientId: patientId };
}

export default fetchActivePatients;
