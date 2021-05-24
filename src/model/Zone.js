const roundFactor = 100;

class Zone {
  constructor(latitude, longitude) {
    this.latitude = Math.round(latitude * roundFactor) / roundFactor;
    this.longitude = Math.round(longitude * roundFactor) / roundFactor;
    this.selected = false;
  }
}

export default Zone;
