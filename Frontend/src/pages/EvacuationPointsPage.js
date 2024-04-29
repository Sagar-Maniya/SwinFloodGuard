import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import './EvacuationPointsPage.css'; //

const libraries = ['places'];
const mapContainerStyle = {
  width: '90vw',
  height: '90vh',
};
const center = {
  lat: 13.0827, // Adjusted center closer to the points of interest
  lng: 80.2707,
};
const evacuationPoints = [
  {
    name: 'Chennai Trade Centre, Nandambakkam',
    location: { lat: 13.0119, lng: 80.171 },
  },
  {
    name: 'Jawaharlal Nehru Stadium',
    location: { lat: 13.0826, lng: 80.2775 },
  },
  { name: 'Island Grounds', location: { lat: 13.0697, lng: 80.2878 } },
  { name: 'Anna University', location: { lat: 13.0104, lng: 80.2335 } },
];

const EvacuationPointsPage = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDqFmnkyc_2SjujWtJU_MBFz7pfR4Jq930',
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <h1
        style={{
          textAlign: 'center',
          color: 'white',
          backgroundColor: 'black',
          padding: '10px',
        }}
      >
        Evacuation Points
      </h1>

      <div className='google-map'>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={center}
        >
          {evacuationPoints.map((point) => (
            <Marker
              key={point.name}
              position={point.location}
              label={point.name}
            />
          ))}
        </GoogleMap>
      </div>
    </div>
  );
};

export default EvacuationPointsPage;
