import * as types from './types';

export function fetchOwners() {
  return { type: types.FETCH_OWNERS_START };
}

export function fetchOwnerById(ownerId) {
  return { type: types.FETCH_OWNER_START, ownerId: ownerId };
}

export function updateOwnerById(ownerId, field, value) {
  return {
    type: types.UPDATE_OWNER_START,
    ownerId,
    patchData: [{ op: 'replace', path: `/${field}`, value: value }],
  };
}

export function deleteOwnerPet(patientId) {
  return {
    type: types.DELETE_OWNER_PET_START,
    patientId: patientId,
  };
}

export function createOwner(newOwner, callback) {
  return {
    type: types.CREATE_NEW_OWNER_START,
    owner: newOwner,
    callback,
  };

}

export default fetchOwners;
