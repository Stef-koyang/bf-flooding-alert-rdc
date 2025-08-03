'use client';
import React, { useEffect, useState } from 'react';

type Data = {
  id: number;
  timestamp: string;
  riviere: string;
  adresse: string;
  distance: number;
  nom_resp: string;
  tel: string;
  temps12: number;
  temps23: number;
  estimation: number;
};

const Table = () => {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/data');
      const json = await res.json();
      setData(json);
    };
    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th>ID</th>
            <th>Date/Heure</th>
            <th>site</th>
            <th>Distance</th>
            <th>Responsable</th>
            <th>Téléphone</th>
            <th>Temps 1-2</th>
            <th>Temps 2-3</th>
            <th>Estimation</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} className="text-center border-t border-gray-200">
              <td>{item.id}</td>
              <td>{item.timestamp}</td>
              <td>{item.adresse}</td>
              <td>{item.distance}</td>
              <td>{item.nom_resp}</td>
              <td>{item.tel}</td>
              <td>{item.temps12}</td>
              <td>{item.temps23}</td>
              <td>{item.estimation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
