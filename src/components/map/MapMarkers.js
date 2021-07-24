import { useState } from 'react';
import { Marker } from '@react-google-maps/api';
import { useSelector } from 'react-redux';

import MapContainer from './Map';
import FlaresModal from './FlaresModal/FlaresModal';
import CreateTicket from '../../components/tickets/CreateTicket/CreateTicket';

import './Map.css';

const Map = () => {
  const { flares, zones } = useSelector((state) => state.flare);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flaresList, setFlaresList] = useState([]); // pass to child FlareModal
  const [selectedFlares, setSelectedFlares] = useState([]); // retreive selected flars id list from child FlaresModal

  const showFlaresModal = (zoneId) => {
    setFlaresList(
      flares.filter((flare) => flare.zone.id.toString() === zoneId)
    );
    setIsModalOpen(true);
  };

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  return (
    <>
      <h1>Google Map</h1>
      <button onClick={() => console.log(zones)}>show zones</button>

      <MapContainer>
        {zones.length
          ? zones.map((zone, i) => (
              <Marker
                key={i}
                position={{ lat: zone.latitude, lng: zone.longitude }}
                // onClick={selectMarker.bind(this, zone)}
                onDblClick={showFlaresModal.bind(this, zone.id)}
                label={{
                  color: '#faa',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  text: `${zone.count}`,
                }}
              ></Marker>
            ))
          : null}
      </MapContainer>
      <div
        className={`flares-modal-container ${!isModalOpen && 'remove-element'}`}
        onClick={toggleModal}
      >
        <FlaresModal
          flaresList={flaresList}
          setSelectedFlares={setSelectedFlares}
          selectedFlares={selectedFlares}
        />
      </div>
      <CreateTicket
        selectedFlares={selectedFlares}
        setSelectedFlares={setSelectedFlares}
      />
    </>
  );
};

export default Map;
