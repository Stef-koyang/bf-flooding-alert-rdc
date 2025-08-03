'use client';

import dynamic from 'next/dynamic';
import Table from '../components/Table';
import { useEffect, useState } from 'react';

const CarteGoogle = dynamic(() => import('../components/CarteGoogle'), {
  ssr: false,
  loading: () => <p>Chargement de la carte...</p>,
});

export default function Home() {
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    // Charger le script Google Maps si ce n'est pas déjà fait
    if (typeof window !== 'undefined' && !window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsMapReady(true);
      document.head.appendChild(script);
    } else {
      setIsMapReady(true);
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">BF FLOODING ALERT</h1>

      {/* Affiche la carte uniquement quand l'API Google Maps est prête */}
      {isMapReady ? <CarteGoogle /> : <p>Chargement de la carte Google Maps...</p>}

      <div className="mt-6">
        <Table />
      </div>

      <audio id="alarm" src="/alarm.mp3" preload="auto" />
    </div>
  );
}
