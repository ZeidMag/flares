import { useState } from 'react';
import { Marker, InfoWindow, MarkerClusterer } from '@react-google-maps/api';
import ZonesList from './ZonesList';
import { useSelector, useDispatch } from 'react-redux';
import { createTicket } from '../../store/actions/tickets';

import MapContainer from './Map';

import './Map.css';
// import GreenMarker from '../../assets/images/green-marker2.png';
// import mapStyle from './mapStyle';

const Map = () => {
  const { flareCount, roundFactor } = useSelector((state) => state.temp);
  const [maxMarker, setMaxMarker] = useState(0);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  const resetMaxMarker = (x) => {
    const lengths = x.clusters.map((cluster) => cluster.markers.length);
    let maxlengthMath = Math.max(...lengths);

    setMaxMarker(maxlengthMath);
  };

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

  const submitTicket = () => {
    const selectedZonesList = selectedZones.filter((zone) => zone.selected);
    dispatch(createTicket([selectedZonesList, subject, description]));
    setSelectedZones(
      selectedZones.map((zone) => ({ ...zone, selected: false }))
    );
    setSubject('');
    setDescription('');
  };

  const handleDblClick = (zone) => {
    const newList = selectedZones.map((oldZone) =>
      oldZone.lat === zone.lat && oldZone.lng === zone.lng
        ? { ...oldZone, selected: !oldZone.selected }
        : { ...oldZone }
    );
    setSelectedZones(newList);
  };

  const removeZoneSelection = (zone) => {
    const newList = selectedZones.filter(
      (oldZone) => oldZone.lat !== zone.lat && oldZone.lng !== zone.lng
    );
    setSelectedZones(newList);
  };

  return (
    <>
      <h1>Google Map</h1>
      <div>
        {selectedZones.filter((zone) => zone.selected === true).length ? (
          <>
            <ol>
              {selectedZones
                .filter((zone) => zone.selected === true)
                .map((item, i) => (
                  <li key={i}>
                    Zone Coordinates: ({item.lat}, {item.lng}). it has{' '}
                    {item.count} flare{item.count > 1 && 's'}
                    <span onClick={removeZoneSelection.bind(this, item)}>
                      {' '}
                      X
                    </span>
                  </li>
                ))}
            </ol>
            <label>Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <button onClick={submitTicket}>Create new Ticket</button>
          </>
        ) : null}
        <MapContainer>
          <MarkerClusterer
            zoomOnClick={false}
            onClusteringBegin={resetMaxMarker}
            // onClusteringEnd={setMaxMarkerOnEnd}
            calculator={(markers, numstyle) => {
              // if (markers.length > maxMarker) {
              //   setMaxMarker(markers.length);
              // }
              if (markers.length >= (maxMarker * 4) / 5) {
                return { text: markers.length, index: 5 };
              }
              if (
                markers.length < (maxMarker * 4) / 5 &&
                markers.length >= (maxMarker * 3) / 5
              ) {
                return { text: markers.length, index: 4 };
              }
              if (
                markers.length < (maxMarker * 3) / 5 &&
                markers.length >= (maxMarker * 2) / 5
              ) {
                return { text: markers.length, index: 3 };
              }
              if (
                markers.length < (maxMarker * 2) / 5 &&
                markers.length >= (maxMarker * 1) / 5
              ) {
                return { text: markers.length, index: 2 };
              }
              return { text: markers.length, index: 1 };
            }}
          >
            {(clusterer) =>
              selectedZones.map((currentZone, index) => (
                <Marker
                  key={index}
                  position={currentZone}
                  clusterer={clusterer}
                  label={{
                    color: '#faa',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    text: `${currentZone.count}`,
                  }}
                  icon={
                    currentZone.selected
                      ? {
                          path: 'M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z',
                          fillColor: 'yellow',
                          fillOpacity: 0.9,
                          scale: 2,
                          strokeColor: 'gold',
                          strokeWeight: 2,
                        }
                      : {
                          path: 'M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z',
                          fillColor: 'green',
                          fillOpacity: 0.9,
                          scale: 2,
                          strokeColor: 'limegreen',
                          strokeWeight: 2,
                        }
                  }
                  onClick={selectMarker.bind(this, currentZone)}
                  onDblClick={handleDblClick.bind(this, currentZone)}
                >
                  {zone &&
                    zone.lat === currentZone.lat &&
                    zone.lng === currentZone.lng && (
                      <InfoWindow onCloseClick={clearMarker}>
                        <div style={{ fontSize: '2rem' }}>{zone.count}</div>
                      </InfoWindow>
                    )}
                </Marker>
              ))
            }
          </MarkerClusterer>
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
