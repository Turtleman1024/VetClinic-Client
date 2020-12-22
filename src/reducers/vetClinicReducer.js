import * as types from '../actions/types';

const initialState = {
  owners: [],
  patients: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_OWNERS_SUCCESS:
      return {
        ...state,
        owners: action.owners,
      };
    case types.FETCH_ACTIVE_PATIENTS_SUCCESS:
      return {
        ...state,
        patients: action.patients,
      };
    default:
      return state;
  }
}
