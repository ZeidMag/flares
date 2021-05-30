/* eslint-disable import/no-anonymous-default-export */
import { SET_ROUND_FACTOR, SET_FLARE_COUNT } from '../actions/temp';

const initialState = {
  roundFactor: 1000,
  flareCount: 50,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ROUND_FACTOR:
      return {
        ...state,
        roundFactor: action.roundFactor,
      };
    case SET_FLARE_COUNT:
      return {
        ...state,
        flareCount: action.flareCount,
      };
    default:
      return state;
  }
};
