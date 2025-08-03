'use client';
import dynamic from 'next/dynamic';
import Table from '../components/Table';
import Chart from '../components/Chart';
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
        setTimeout(() => {
          alarmAudio.play().catch(() => {});
        }, 3000); // déclenche l'alarme après 3 secondes
      }
    };

    const interval = setInterval(checkAlarm, 2000);
    return () => clearInterval(interval);
  }, []);

  const exportData = async () => {
    const response = await fetch('/api/data');
    const data = await response.json();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'donnees_inondation.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">BF FLOODING ALERT</h1>

      {/* Tableau en haut */}
      <Table />
      <div className="text-right mb-4">
        <button onClick={exportData} className="bg-blue-600 text-white px-4 py-2 rounded">
          Sauvegarder les données
        </button>
      </div>

      {/* Section graphique et carte côte à côte */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <Chart />
        </div>
        <div className="w-full md:w-1/2">
          <CarteGoogle />
        </div>
      </div>

      <audio id="alarm" src="/alarm.mp3" preload="auto" />
    </div>
  );
}
