import axios from 'axios';
export const GET_FLARES = 'GET_FLARES';
export const UPDATE_FLARES = 'UPDATE_FLARES';

export const getFlares = () => {
  return async (dispatch) => {
    const response = await axios.get('http://localhost:5000/api/v1/flare');
    if (response && response.data.success) {
      dispatch({
        type: GET_FLARES,
        payload: response.data.data,
      });
    }
  };
};

export const updateFlares = (flaresList) => {
  return {
    type: UPDATE_FLARES,
    payload: flaresList,
  };
};
