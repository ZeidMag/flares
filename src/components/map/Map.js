import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { useDispatch } from 'react-redux';
import { getFlares } from '../../store/actions/flare';

const defaultZoom = 16;
const defaultCenter = { lat: 32.885, lng: 13.188 };
const defaultMapContainerStyle = { width: '100vw', height: '70vh' };

const Map = ({
  zoom = defaultZoom,
  center = defaultCenter,
  mapContainerStyle = defaultMapContainerStyle,
  children,
}) => {
  const dispatch = useDispatch();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCSLXG5j-CqSB0zR476bJFXOSQ9sWuXqH0',
  });

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  const loadFlares = () => {
    dispatch(getFlares());
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={zoom}
      center={center}
      onLoad={loadFlares}
    >
      {children}
    </GoogleMap>
  );
};

export default Map;
