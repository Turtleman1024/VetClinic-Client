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
    case types.FETCH_OWNER_SUCCESS: {
      return {
        ...state,
        currentOwner: action.owner,
      };
    }
    case types.UPDATE_OWNER_SUCCESS:
      return {
        ...state,
        currentOwner: action.owner,
      };
    case types.FETCH_ACTIVE_PATIENTS_SUCCESS:
      return {
        ...state,
        patients: action.patients,
      };
    case types.FETCH_PATIENT_SUCCESS:
      return {
        ...state,
        currentPatient: action.patient,
      };
    case types.UPDATE_PATIENT_SUCCESS:
      const ownerPetIndex = state.currentOwner.ownerPets.findIndex(
        (x) => x.patientId === action.patient.patientId
      );
      return {
        ...state,
        currentOwner: {
          ...state.currentOwner,
          ownerPets: [
            ...state.currentOwner.ownerPets.slice(0, ownerPetIndex),
            action.patient,
            ...state.currentOwner.ownerPets.slice(ownerPetIndex + 1),
          ],
        },
        currentPatient: action.patient,
      };
    case types.CREATE_NEW_PATIENT_SUCCESS: {
      return {
        ...state,
        currentOwner: {
          ...state.currentOwner,
          ownerPets: [...state.currentOwner.ownerPets, action.patient],
        },
      };
    }
    case types.DELETE_OWNER_PET_SUCCESS: {
      return {
        ...state,
        currentOwner: {
          ...state.currentOwner,
          ownerPets: [
            ...state.currentOwner.ownerPets.filter(
              (x) => x.patientId !== action.patientId
            ),
          ],
        },
      };
    }
    default:
      return state;
  }
}
