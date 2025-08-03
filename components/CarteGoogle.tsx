'use client';
import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

const coordsByAdresse: Record<string, { lat: number; lng: number }> = {
  Kalamu: { lat: -4.339, lng: 15.304 },
  Bandal: { lat: -4.3301, lng: 15.2661 },
  Kintambo: { lat: -4.309, lng: 15.2812 },
  Mbudi: { lat: -4.463, lng: 15.1899 },
  Kingabwa: { lat: -4.346, lng: 15.35 },
  Ndjili: { lat: -4.385, lng: 15.506 },
};

const CarteGoogle: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const markersRef = useRef<any[]>([]);
  const boundsRef = useRef<any>(null);

  // Charger la carte une seule fois
  useEffect(() => {
    if (!window.google || !mapRef.current) return;

    const gmap = new window.google.maps.Map(mapRef.current, {
      zoom: 12,
      center: { lat: -4.33, lng: 15.3 },
    });

    boundsRef.current = new window.google.maps.LatLngBounds();
    setMap(gmap);
  }, []);

  // Charger les données toutes les 2 secondes
  useEffect(() => {
    if (!map) return;

    const interval = setInterval(async () => {
      const response = await fetch('/api/data');
      const data = await response.json();

      // Supprimer les anciens marqueurs
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
      const bounds = new window.google.maps.LatLngBounds();

      data.forEach((point: any) => {
        const coord = coordsByAdresse[point.adresse];
        if (!coord) return;

        const marker = new window.google.maps.Marker({
          position: coord,
          map,
          title: `${point.adresse} - Estimation: ${point.estimation}`,
        });

        markersRef.current.push(marker);
        bounds.extend(coord);

        // Déclencher l'alarme si estimation > 60
        if (point.estimation > 60) {
          const alarm = document.getElementById('alarm') as HTMLAudioElement;
          if (alarm && alarm.paused) {
            alarm.play().catch(() => {});
          }
        }
      });

      map.fitBounds(bounds);
    }, 2000); // toutes les 2 secondes

    return () => clearInterval(interval);
  }, [map]);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
};

export default CarteGoogle;
