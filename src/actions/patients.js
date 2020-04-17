import { FETCH_ACTIVE_PATIENTS } from './types';

export const fetchActivePatients = () => (dispatch) => {
  fetch('https://localhost:44368/api/v1/patients/active')
    .then((response) => response.json())
    .then((patients) =>
      dispatch({ type: FETCH_ACTIVE_PATIENTS, payload: patients })
    );
};
