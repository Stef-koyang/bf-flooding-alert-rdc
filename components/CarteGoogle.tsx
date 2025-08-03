'use client';
import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

const CarteGoogle: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    const loadMap = async () => {
      const response = await fetch('/api/data');
      const data = await response.json();

      if (!window.google || !mapRef.current) return;

      const gmap = new window.google.maps.Map(mapRef.current, {
        zoom: 12,
        center: { lat: -4.35, lng: 15.3 },
      });

      const bounds = new window.google.maps.LatLngBounds();

      data.forEach((point: any) => {
        const position = { lat: point.lat, lng: point.lng };
        bounds.extend(position);

        new window.google.maps.Marker({
          position,
          map: gmap,
          title: point.adresse,
        });
      });

      gmap.fitBounds(bounds);
      setMap(gmap);
    };

    loadMap();
  }, []);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
};

export default CarteGoogle;
