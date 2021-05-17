import React from 'react';
import { GoogleMap, withGoogleMap, Marker } from 'react-google-maps';
import LocationsList from './LocationsList';

const Map = () => (
  <div>
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: LocationsList[0].lat, lng: LocationsList[0].lng }}
    >
      {LocationsList.map((marker) => (
        <Marker position={{ lat: marker.lat, lng: marker.lng }} />
      ))}
    </GoogleMap>
  </div>
);

export default withGoogleMap(Map);
