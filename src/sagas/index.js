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

export default function* rootSaga() {
  yield takeEvery(types.FETCH_OWNERS_START, fetchOwners);
  yield takeEvery(types.FETCH_ACTIVE_PATIENTS_START, fetchPatients);
  yield takeEvery(types.FETCH_OWNER_START, fetchOwnerById);
}
