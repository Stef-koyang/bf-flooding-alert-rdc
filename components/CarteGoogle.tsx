'use client';

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
    if (!window.google || !mapRef.current) return;

    let map = new window.google.maps.Map(mapRef.current, {
      zoom: 60,
      center: { lat: 60, lng: 40 },
    });

    const bounds = new window.google.maps.LatLngBounds();

    locations.forEach((loc) => {
      console.log("Location Courante :",loc)
      new window.google.maps.Marker({
        position: { lat: loc.lat, lng: loc.lng },
        map,
        title: loc.name,
      });
      bounds.extend({ lat: loc.lat, lng: loc.lng });
    });
    //{ lat: -4.35, lng: 15.3 }
    
    map.setCenter({ lat: 60, lng: 40 })
    map.setZoom(150)
    console.log("MAP monté : ", map,"loc:" ,locations)
    
    map.fitBounds(bounds);
  }, []);
    
  return <div ref={mapRef} style={{ height: '400px', width: '90%',margin:'auto' }} />;
};

export default CarteGoogle;
