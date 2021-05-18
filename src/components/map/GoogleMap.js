import React from 'react';
import Map from './Map';

let GoogleMap = () => (
  <div>
    <h4>Google Map</h4>
    <div style={{ width: '100%', height: '500px' }}>
      <Map
        location={{ latitude: 32.861108, longitude: 13.184891 }}
        containerElement={<div style={{ width: '100%', height: '100%' }} />}
        mapElement={<div style={{ width: `100%`, height: '100%' }} />}
      />
    </div>
  </div>
);

export default GoogleMap;
