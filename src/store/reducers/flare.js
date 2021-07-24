/* eslint-disable import/no-anonymous-default-export */
import { GET_FLARES, UPDATE_FLARES } from '../actions/flare';

const initialState = {
  flares: [],
  zones: [],
};

const countFlaresAndCoordsInZone = (flareList) => {
  const flaresCountInZone = flareList.reduce((acc, curr) => {
    acc[curr.zone.id] = (acc[curr.zone.id] || 0) + 1;
    return acc;
  }, {});
  const zonesWithFlareCountAndCoordinates = [];
  for (const Zone in flaresCountInZone) {
    zonesWithFlareCountAndCoordinates.push({
      id: Zone,
      latitude: flareList.find(({ zone }) => zone.id.toString() === Zone).zone
        .latitude,
      longitude: flareList.find(({ zone }) => zone.id.toString() === Zone).zone
        .longitude,
      count: flaresCountInZone[Zone],
    });
  }
  return zonesWithFlareCountAndCoordinates;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FLARES:
      return {
        ...state,
        flares: [...action.payload],
        zones: countFlaresAndCoordsInZone(action.payload),
      };
    case UPDATE_FLARES:
      return {
        ...state,
        flares: [...action.payload],
        zones: countFlaresAndCoordsInZone(action.payload),
      };
    default:
      return state;
  }
};
