'use client';
import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

const CarteGoogle: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markers = useRef<any[]>([]);

  const loadMarkers = async () => {
    const response = await fetch('/api/data');
    const data = await response.json();

    if (!window.google || !mapRef.current) return;

    if (!mapInstance.current) {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        zoom: 12,
        center: { lat: -4.35, lng: 15.3 },
      });
    }

    // Supprimer les anciens marqueurs
    markers.current.forEach(marker => marker.setMap(null));
    markers.current = [];

    const bounds = new window.google.maps.LatLngBounds();

    data.forEach((point: any) => {
      if (point.lat && point.lng) {
        const position = { lat: point.lat, lng: point.lng };
        bounds.extend(position);

        const marker = new window.google.maps.Marker({
          position,
          map: mapInstance.current,
          title: point.adresse,
        });

        markers.current.push(marker);
      }
    });

    if (data.length > 0) {
      mapInstance.current.fitBounds(bounds);
    }
  };

  useEffect(() => {
    const interval = setInterval(loadMarkers, 2000); // toutes les 2s
    return () => clearInterval(interval);
  }, []);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
};

export default CarteGoogle;
