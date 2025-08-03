'use client';
import dynamic from 'next/dynamic';
import Table from '../components/Table';
import { useEffect } from 'react';

const CarteGoogle = dynamic(() => import('../components/CarteGoogle'), { ssr: false });

export default function Home() {
  useEffect(() => {
    const alarmAudio = document.getElementById('alarm') as HTMLAudioElement;

    const checkAlarm = async () => {
      const response = await fetch('/api/data');
      const data = await response.json();

      const hasAlert = data.some((item: any) => item.estimation >= 50);

      if (hasAlert && alarmAudio) {
        alarmAudio.play().catch(() => {}); // éviter les erreurs si interaction manquante
      }
    };

    const interval = setInterval(checkAlarm, 2000); // toutes les 2s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">BF FLOODING ALERT</h1>
      <CarteGoogle />
      <div className="mt-6">
        <Table />
      </div>
      <audio id="alarm" src="/alarm.mp3" preload="auto" />
    </div>
  );
}

