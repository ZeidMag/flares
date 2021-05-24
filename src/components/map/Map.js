import { useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import ZonesList from './ZonesList';

// import GreenMarker from '../../assets/images/green-marker2.png';
// import mapStyle from './mapStyle';

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCSLXG5j-CqSB0zR476bJFXOSQ9sWuXqH0',
  });

  const [zone, setZone] = useState(null);
  const selectMarker = (selectedZone) => {
    setZone(selectedZone);
  };
  const clearMarker = () => {
    setZone(null);
  };

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';
  return (
    <div>
      <GoogleMap
        mapContainerStyle={{ width: '100vw', height: '70vh' }}
        zoom={15}
        center={{ lat: 32.8667339, lng: 13.2017534 }}
        // options={{
        //   styles: mapStyle,
        //   disableDefaultUI: true,
        //   zoomControl: true,
        // }}
      >
        {ZonesList.map((currentZone, index) => (
          <Marker
            key={index}
            position={{ lat: currentZone.lat, lng: currentZone.lng }}
            label={{
              color: '#faa',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              text: `${currentZone.count}`,
            }}
            // icon={{
            //   path: 'M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z',
            //   fillColor: 'yellow',
            //   fillOpacity: 0.9,
            //   scale: 2,
            //   strokeColor: 'gold',
            //   strokeWeight: 2,
            // }}
            onClick={selectMarker.bind(this, currentZone)}
            // icon={{
            //   url: GreenMarker,
            //   scaledSize: new window.google.maps.Size(25, 25),
            // }}
            // onDblClick={() => console.log('double click !')}
          >
            {zone &&
              zone.lat === currentZone.lat &&
              zone.lng === currentZone.lng && (
                <InfoWindow onCloseClick={clearMarker}>
                  <div style={{ fontSize: '2rem' }}>{zone.count}</div>
                </InfoWindow>
              )}
          </Marker>
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
