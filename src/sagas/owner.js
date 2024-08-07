import { call, put, takeEvery } from 'redux-saga/effects';
import * as types from '../actions/types';

const baseAddress = 'https://localhost:44368/api/v1';

export function* fetchOwners() {
  const endpoint = baseAddress + '/owners';
  const response = yield call(fetch, endpoint);
  const data = yield response.json();
  yield put({ type: types.FETCH_OWNERS_SUCCESS, owners: data });
}

export function* fetchOwnerById(action) {
  const endpoint = baseAddress + `/owner/id/${action.ownerId}`;
  const response = yield call(fetch, endpoint);
  const data = yield response.json();
  yield put({ type: types.FETCH_OWNER_SUCCESS, owner: data });
}

export function* updateOwner(action) {
  const endpoint = baseAddress + `/owner/${action.ownerId}`;
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

export function* deletePet(action) {
  const endpoint = baseAddress + `/patient/remove?patientId=${action.patientId}`;
  const response = yield fetch(endpoint, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  //const data = yield response.json();
  yield put({
    type: types.DELETE_OWNER_PET_SUCCESS,
    patientId: action.patientId,
  });
}

export function* createOwner(action) {
  const endpoint = baseAddress + '/owner';
  const response = yield fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(action.owner),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = yield response.json();
  yield put({
    type: types.CREATE_NEW_OWNER_SUCCESS,
    owner: data,
  });
  action.callback(data.ownerId);

}

export default function* ownerSaga() {
  yield takeEvery(types.FETCH_OWNERS_START, fetchOwners);
  yield takeEvery(types.FETCH_OWNER_START, fetchOwnerById);
  yield takeEvery(types.UPDATE_OWNER_START, updateOwner);
  yield takeEvery(types.DELETE_OWNER_PET_START, deletePet);
  yield takeEvery(types.CREATE_NEW_OWNER_START, createOwner);
}
