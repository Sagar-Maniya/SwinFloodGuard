import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow, LoadScript } from '@react-google-maps/api';
import axios from 'axios';

const mapContainerStyle = {
    width: '100%',
    height: '100vh',
};

const center = {
    lat: 0,
    lng: 0,
};

const GoogleMapComponent = () => {
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [apiResponse, setApiResponse] = useState(null);

    const handleMapClick = (e) => {
        const clickedLatLng = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        };
        setSelectedPlace(clickedLatLng);
        setApiResponse(null);
    };

    const handleYesClick = async () => {
        if (selectedPlace) {
            const apiUrl = `http://localhost:8080/flood?latitude=${selectedPlace.lat}&longitude=${selectedPlace.lng}`;
            console.log('Request URL:', apiUrl);

            try {
                const response = await axios.get(apiUrl);
                setApiResponse(response.data);
            } catch (error) {
                console.error('Error fetching API:', error);

                if (error.response && error.response.data && error.response.data.message) {
                    setApiResponse(error.response.data.message);
                } else {
                    setApiResponse('An error occurred while fetching data.');
                }
            }
        }
    };

    const handleNoClick = () => {
        setSelectedPlace(null); // Clear selected place to close the InfoWindow
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyDqFmnkyc_2SjujWtJU_MBFz7pfR4Jq930">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={2}
                onClick={handleMapClick}
            >
                {selectedPlace && <Marker position={selectedPlace} onClick={() => setSelectedPlace(null)} />}

                {selectedPlace && (
                    <InfoWindow position={selectedPlace} onCloseClick={() => setSelectedPlace(null)}>
                        <div style={{ minWidth: 200 }}>
                            <h3>Location Details</h3>
                            <div style={{ display: 'flex', marginBottom: '10px' }}>
                                <p style={{ marginRight: '30px' }}>Latitude: {selectedPlace.lat}</p>
                                <p>Longitude: {selectedPlace.lng}</p>
                            </div>
                            <h3 style={{ color: "yellowGreen" }}>Do you want to see flood predection for the selected place</h3>

                            {apiResponse !== null ? (
                                typeof apiResponse === 'string' ? (
                                    <div style={{ textAlign: "center" }}>
                                        <h3 style={{ color: 'red' }}>Result </h3>
                                        <p>{apiResponse}</p>
                                    </div>
                                ) : (
                                    <div>
                                        <h3 style={{ color: 'yellowGreen' }}>Flood Prediction for the selected place</h3>
                                        <p>River Discharge: {apiResponse.river_discharge}</p>
                                        <p>Flood Probability: {apiResponse.flood_probability}</p>
                                    </div>
                                )
                            ) : (
                                <div style={{ display: 'flex', marginTop: '20px' }}>
                                    <button style={{ padding: '8px', width: '80px' }} onClick={handleYesClick}>
                                        Yes
                                    </button>
                                    <button style={{ marginLeft: '20px', padding: '8px', width: '80px' }} onClick={handleNoClick}>
                                        No
                                    </button>
                                </div>
                            )}
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default GoogleMapComponent;
