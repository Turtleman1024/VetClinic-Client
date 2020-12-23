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

export default fetchOwners;
