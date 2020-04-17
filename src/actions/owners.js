import { FETCH_OWNERS } from './types';

export const fetchOwners = () => (dispatch) => {
  fetch('https://localhost:44368/api/v1/owners')
    .then((response) => response.json())
    .then((owners) => dispatch({ type: FETCH_OWNERS, payload: owners }));
};
