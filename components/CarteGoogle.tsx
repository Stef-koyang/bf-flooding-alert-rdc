import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const locations = [
  { name: 'Kintambo', lat: -4.3194, lng: 15.2844 },
  { name: 'Bandal', lat: -4.3307, lng: 15.2723 },
  { name: 'Kalamu', lat: -4.3433, lng: 15.2987 },
  { name: 'Kingabwa', lat: -4.3580, lng: 15.3569 },
  { name: 'Ndjili', lat: -4.3831, lng: 15.3875 },
  { name: 'Gombe', lat: -4.3192, lng: 15.3116 },
];

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: -4.35,
  lng: 15.3,
};

export default function CarteGoogle() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) return <div>⚠️ Clé API Google Maps manquante !</div>;

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {locations.map((loc, i) => (
          <Marker
            key={i}
            position={{ lat: loc.lat, lng: loc.lng }}
            title={loc.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
