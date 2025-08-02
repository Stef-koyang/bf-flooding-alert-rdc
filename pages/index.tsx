'use client';
import dynamic from 'next/dynamic';
import Table from '../components/Table';

const CarteGoogle = dynamic(() => import('../components/CarteGoogle'), { ssr: false });

export default function Home() {
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
