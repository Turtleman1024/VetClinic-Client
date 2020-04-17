import { FETCH_OWNERS, FETCH_ACTIVE_PATIENTS } from '../actions/types';

const initialState = {
  owners: [],
  patients: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_OWNERS:
      return {
        ...state,
        owners: action.payload,
      };
    case FETCH_ACTIVE_PATIENTS:
      return {
        ...state,
        patients: action.payload,
      };
    default:
      return state;
  }
}
