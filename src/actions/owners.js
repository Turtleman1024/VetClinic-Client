import * as types from './types';

export function fetchOwners() {
  return { type: types.FETCH_OWNERS_START };
}

export function fetchOwnerById(ownerId) {
  return { type: types.FETCH_OWNER_START, ownerId: ownerId };
}

export default fetchOwners;
