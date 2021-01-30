import { call, put, takeEvery } from 'redux-saga/effects';
import * as types from '../actions/types';

export function* fetchOwners() {
  const endpoint = 'https://localhost:44368/api/v1/owners';
  const response = yield call(fetch, endpoint);
  const data = yield response.json();
  yield put({ type: types.FETCH_OWNERS_SUCCESS, owners: data });
}

export function* fetchOwnerById(action) {
  const endpoint = `https://localhost:44368/api/v1/owner/id/${action.ownerId}`;
  const response = yield call(fetch, endpoint);
  const data = yield response.json();
  yield put({ type: types.FETCH_OWNER_SUCCESS, owner: data });
}

export function* fetchPatients() {
  const endpoint = 'https://localhost:44368/api/v1/patients/active';
  const response = yield call(fetch, endpoint);
  const data = yield response.json();
  yield put({ type: types.FETCH_ACTIVE_PATIENTS_SUCCESS, patients: data });
}

export function* fetchPatientById(action) {
  const endpoint = `https://localhost:44368/api/v1/patient/id/${action.patientId}`;
  const response = yield call(fetch, endpoint);
  const data = yield response.json();
  yield put({ type: types.FETCH_PATIENT_SUCCESS, patient: data });
}

export function* updateOwner(action) {
  const endpoint = `https://localhost:44368/api/v1/owner/${action.ownerId}`;
  const response = yield fetch(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(action.patchData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = yield response.json();
  yield put({
    type: types.UPDATE_OWNER_SUCCESS,
    ownerId: action.ownerId,
    owner: data,
  });
}

export function* updatePatient(action) {
  const endpoint = `https://localhost:44368/api/v1/patient/${action.patientId}`;
  const response = yield fetch(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(action.patchData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = yield response.json();
  yield put({
    type: types.UPDATE_PATIENT_SUCCESS,
    patientId: action.patientId,
    patient: data,
  });
}

export function* createNewPatient(action) {
  const endpoint = `https://localhost:44368/api/v1/patient`;
  const response = yield fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(action.patient),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = yield response.json();
  yield put({
    type: types.CREATE_NEW_PATIENT_SUCCESS,
    patient: data,
  });
}

export default function* rootSaga() {
  yield takeEvery(types.FETCH_OWNERS_START, fetchOwners);
  yield takeEvery(types.FETCH_ACTIVE_PATIENTS_START, fetchPatients);
  yield takeEvery(types.FETCH_OWNER_START, fetchOwnerById);
  yield takeEvery(types.FETCH_PATIENT_START, fetchPatientById);
  yield takeEvery(types.UPDATE_OWNER_START, updateOwner);
  yield takeEvery(types.UPDATE_PATIENT_START, updatePatient);
  yield takeEvery(types.CREATE_NEW_PATIENT_START, createNewPatient);
}
