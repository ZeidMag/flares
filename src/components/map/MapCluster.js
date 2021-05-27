import { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from "@react-google-maps/api";
import ZonesList from "./ZonesList";
import { useSelector } from "react-redux";

import "./Map.css";
import "./Sidebar.css";
// import GreenMarker from '../../assets/images/green-marker2.png';
// import mapStyle from './mapStyle';

const Map = () => {
  const { flareCount, roundFactor } = useSelector((state) => state.temp);
  const [maxMarker, setMaxMarker] = useState(0);
  const resetMaxMarker = (x) => {
    var lengths = x.clusters.map(function (cluster) {
      return cluster.markers.length;
    });
    let maxlengthMath = Math.max(...lengths);

    setMaxMarker(maxlengthMath);
    console.log("resetted");
  };
  const setMaxMarkerOnEnd = (x) => {
    console.log("resetted on end");
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCSLXG5j-CqSB0zR476bJFXOSQ9sWuXqH0",
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

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";
  return (
    <>
      {/* <div className="sidebar">hi</div> */}
      <h1>Google Map</h1>
      <div>
        {selectedZones.filter((zone) => zone.selected === true).length ? (
          <ol>
            {selectedZones
              .filter((zone) => zone.selected === true)
              .map((item, i) => (
                <li key={i}>
                  Zone Coordinates: ({item.lat}, {item.lng}). it has{" "}
                  {item.count} flare{item.count > 1 && "s"}
                </li>
              ))}
          </ol>
        ) : null}
        <GoogleMap
          mapContainerStyle={{ width: "100vw", height: "70vh" }}
          zoom={14}
          center={{ lat: 32.8667339, lng: 13.2017534 }}
          // options={{
          //   styles: mapStyle,
          //   disableDefaultUI: true,
          //   zoomControl: true,
          // }}
        >
          <MarkerClusterer
            zoomOnClick={false}
            onClusteringBegin={resetMaxMarker}
            onClusteringEnd={setMaxMarkerOnEnd}
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
                    color: "#faa",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    text: `${currentZone.count}`,
                  }}
                  icon={
                    currentZone.selected
                      ? {
                          path:
                            "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
                          fillColor: "yellow",
                          fillOpacity: 0.9,
                          scale: 2,
                          strokeColor: "gold",
                          strokeWeight: 2,
                        }
                      : {
                          path:
                            "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
                          fillColor: "green",
                          fillOpacity: 0.9,
                          scale: 2,
                          strokeColor: "limegreen",
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
                        <div style={{ fontSize: "2rem" }}>{zone.count}</div>
                      </InfoWindow>
                    )}
                </Marker>
              ))
            }
          </MarkerClusterer>
        </GoogleMap>
        <button onClick={() => console.log(maxMarker)}>show marker list</button>
      </div>
    </>
  );
};

export default Map;
