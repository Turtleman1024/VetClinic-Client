import * as types from './types';

export function fetchOwners() {
  return { type: types.FETCH_OWNERS_START };
}

export default fetchOwners;
