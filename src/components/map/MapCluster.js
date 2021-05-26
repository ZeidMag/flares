import { useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from '@react-google-maps/api';
import ZonesList from './ZonesList';
import { useSelector } from 'react-redux';

import './Map.css';
// import GreenMarker from '../../assets/images/green-marker2.png';
// import mapStyle from './mapStyle';

const Map = () => {
  const { flareCount, roundFactor } = useSelector((state) => state.temp);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCSLXG5j-CqSB0zR476bJFXOSQ9sWuXqH0',
  });

  const [zone, setZone] = useState(null);
  const [selectedZones, setSelectedZones] = useState(
    ZonesList(flareCount, roundFactor)
  );

  const selectMarker = (selectedZone) => {
    setZone(selectedZone);
  };
  const clearMarker = () => {
    setZone(null);
  };

  const handleDblClick = (zone) => {
    const newList = selectedZones.map((oldZone) =>
      oldZone.lat === zone.lat && oldZone.lng === zone.lng
        ? { ...oldZone, selected: !oldZone.selected }
        : { ...oldZone }
    );
    setSelectedZones(newList);
  };

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';
  return (
    <div>
      {selectedZones.filter((zone) => zone.selected === true).length ? (
        <ol>
          {selectedZones
            .filter((zone) => zone.selected === true)
            .map((item, i) => (
              <li key={i}>
                Zone Coordinates: ({item.lat}, {item.lng}). it has {item.count}{' '}
                flare{item.count > 1 && 's'}
              </li>
            ))}
        </ol>
      ) : null}
      <GoogleMap
        mapContainerStyle={{ width: '100vw', height: '70vh' }}
        zoom={14}
        center={{ lat: 32.8667339, lng: 13.2017534 }}
        // options={{
        //   styles: mapStyle,
        //   disableDefaultUI: true,
        //   zoomControl: true,
        // }}
      >
        <MarkerClusterer>
          {(clusterer) =>
            selectedZones.map((location, index) => (
              <Marker
                key={index}
                position={location}
                clusterer={clusterer}
                label={{
                  color: '#faa',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  text: `${location.count}`,
                }}
              />
            ))
          }
        </MarkerClusterer>
      </GoogleMap>
    </div>
  );
};

export default Map;
