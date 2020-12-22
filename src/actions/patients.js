import * as types from './types';

export function fetchActivePatients() {
  return { type: types.FETCH_ACTIVE_PATIENTS_START };
}

export default fetchActivePatients;
