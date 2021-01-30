import * as types from './types';

export function fetchActivePatients() {
  return { type: types.FETCH_ACTIVE_PATIENTS_START };
}

export function fetchPatientById(patientId) {
  return { type: types.FETCH_PATIENT_START, patientId: patientId };
}

export function updatePatientById(patientId, field, value) {
  return {
    type: types.UPDATE_PATIENT_START,
    patientId,
    patchData: [{ op: 'replace', path: `/${field}`, value: value }],
  };
}

export function createNewPatient(patient) {
  return {
    type: types.CREATE_NEW_PATIENT_START,
    patient: patient,
  };
}

export default fetchActivePatients;
