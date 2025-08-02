import React, { useEffect, useRef } from 'react';

const locations = [
  { name: 'Kintambo', lat: -4.3194, lng: 15.2844 },
  { name: 'Bandal', lat: -4.3307, lng: 15.2723 },
  { name: 'Kalamu', lat: -4.3433, lng: 15.2987 },
  { name: 'Kingabwa', lat: -4.3580, lng: 15.3569 },
  { name: 'Ndjili', lat: -4.3831, lng: 15.3875 },
  { name: 'Gombe', lat: -4.3192, lng: 15.3116 },
];

declare global {
  interface Window {
    google: any;
  }
}

const CarteGoogle: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = new window.google.maps.Map(mapRef.current!, {
      zoom: 12,
      center: { lat: -4.35, lng: 15.3 },
    });

    locations.forEach((loc) => {
      new window.google.maps.Marker({
        position: { lat: loc.lat, lng: loc.lng },
        map: loader,
        title: loc.name,
      });
    });

    const bounds = new window.google.maps.LatLngBounds();
    locations.forEach(loc => bounds.extend({ lat: loc.lat, lng: loc.lng }));
    loader.fitBounds(bounds);
  }, []);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
};

export default CarteGoogle;
