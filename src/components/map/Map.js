import { GoogleMap, useLoadScript } from '@react-google-maps/api';

const defaultZoom = 14;
const defaultCenter = { lat: 32.8667339, lng: 13.2017534 };
const defaultMapContainerStyle = { width: '100vw', height: '70vh' };

const Map = ({
  zoom = defaultZoom,
  center = defaultCenter,
  mapContainerStyle = defaultMapContainerStyle,
  children,
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCSLXG5j-CqSB0zR476bJFXOSQ9sWuXqH0',
  });

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={zoom}
      center={center}
    >
      {children}
    </GoogleMap>
  );
};

export default Map;
