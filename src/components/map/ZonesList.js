import Zone from '../../model/Zone';

const list = [];

const randomNumberGenerator = (min, max) => {
  return Math.random() * (max - min) + min;
};

const ZoneContainer = (flareCount, roundFactor) => {
  for (let i = 0; i < flareCount; i++) {
    list.push(
      new Zone(
        randomNumberGenerator(32.857, 32.874),
        randomNumberGenerator(13.165, 13.235),
        roundFactor
      )
    );
  }

  let count = list.reduce((acc, curr) => {
    const str = JSON.stringify(curr);
    acc[str] = (acc[str] || 0) + 1;
    return acc;
  }, {});

  const ZonesList = [];

  for (const position in count) {
    ZonesList.push({
      lat: JSON.parse(position).latitude,
      lng: JSON.parse(position).longitude,
      selected: JSON.parse(position).selected,
      count: count[position],
    });
  }
  return ZonesList;
};

export default ZoneContainer;
