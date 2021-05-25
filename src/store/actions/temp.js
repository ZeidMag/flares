export const SET_ROUND_FACTOR = 'SET_FACTOR';
export const SET_FLARE_COUNT = 'SET_FLARE_COUNT';

export const setFactor = (roundFactor) => {
  return {
    type: SET_ROUND_FACTOR,
    roundFactor,
  };
};

export const setFlareCount = (flareCount) => {
  return {
    type: SET_FLARE_COUNT,
    flareCount,
  };
};
