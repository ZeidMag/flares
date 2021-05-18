import { useState } from 'react';
import { GoogleMap, withGoogleMap, Marker } from 'react-google-maps';
import LocationsList from './LocationsList';

const coordinates = {
  lat: 32.88,
  lng: 13.18,
};

const Map = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const onValueChange = (e) => {
    setSelectedOption(e.target.value);
  };
  return (
    <div>
      <p style={{ textAlign: 'center' }}>Please select your Scale:</p>
      <div className="d-flex" style={{ justifyContent: 'center' }}>
        <div>
          <input
            type="radio"
            name="scale"
            value="0.001"
            checked={selectedOption === '0.001'}
            onChange={onValueChange}
          />
          <br />
          <label htmlFor="0.001">0.001</label>
        </div>
        <div style={{ marginLeft: '1rem' }}>
          <input
            type="radio"
            name="scale"
            value="0.0025"
            checked={selectedOption === '0.0025'}
            onChange={onValueChange}
          />
          <br />
          <label htmlFor="0.0025">0.0025</label>
        </div>
        <div style={{ marginLeft: '1rem' }}>
          <input
            type="radio"
            name="scale"
            value="0.005"
            checked={selectedOption === '0.005'}
            onChange={onValueChange}
          />
          <br />
          <label htmlFor="0.005">0.005</label>
        </div>
        <div style={{ marginLeft: '1rem' }}>
          <input
            type="radio"
            name="scale"
            value="0.0075"
            checked={selectedOption === '0.0075'}
            onChange={onValueChange}
          />
          <br />
          <label htmlFor="0.0075">0.0075</label>
        </div>
        <div style={{ marginLeft: '1rem' }}>
          <input
            type="radio"
            name="scale"
            value="0.01"
            checked={selectedOption === '0.01'}
            onChange={onValueChange}
          />
          <br />
          <label htmlFor="0.01">0.01</label>
        </div>
      </div>

      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: LocationsList[0].lat, lng: LocationsList[0].lng }}
      >
        <Marker
          position={{ lat: coordinates.lat, lng: coordinates.lng }}
          label="1"
        />
        <Marker
          position={{
            lat: coordinates.lat,
            lng: coordinates.lng + parseFloat(selectedOption),
          }}
          label="2"
        />
        <Marker
          position={{
            lat: coordinates.lat,
            lng: coordinates.lng + parseFloat(selectedOption) * 2,
          }}
          label="3"
        />
        <Marker
          position={{
            lat: coordinates.lat - parseFloat(selectedOption),
            lng: coordinates.lng,
          }}
          label="4"
        />
        <Marker
          position={{
            lat: coordinates.lat - parseFloat(selectedOption),
            lng: coordinates.lng + parseFloat(selectedOption),
          }}
          label="5"
        />
        <Marker
          position={{
            lat: coordinates.lat - parseFloat(selectedOption),
            lng: coordinates.lng + parseFloat(selectedOption) * 2,
          }}
          label="6"
        />
        <Marker
          position={{
            lat: coordinates.lat - parseFloat(selectedOption) * 2,
            lng: coordinates.lng,
          }}
          label="7"
        />
        <Marker
          position={{
            lat: coordinates.lat - parseFloat(selectedOption) * 2,
            lng: coordinates.lng + parseFloat(selectedOption),
          }}
          label="8"
        />
        <Marker
          position={{
            lat: coordinates.lat - parseFloat(selectedOption) * 2,
            lng: coordinates.lng + parseFloat(selectedOption) * 2,
          }}
          label="9"
        />
      </GoogleMap>
    </div>
  );
};

export default withGoogleMap(Map);
