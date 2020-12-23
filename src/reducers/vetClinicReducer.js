import * as types from '../actions/types';

const initialState = {
  owners: [],
  currentOwner: {},
  patients: [],
  currentPatient: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_OWNERS_SUCCESS:
      return {
        ...state,
        owners: action.owners,
      };
    case types.FETCH_OWNER_SUCCESS: {
      return {
        ...state,
        currentOwner: action.owner,
      };
    }
    case types.FETCH_ACTIVE_PATIENTS_SUCCESS:
      return {
        ...state,
        patients: action.patients,
      };
    default:
      return state;
  }
}
