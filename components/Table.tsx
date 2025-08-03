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
const style={
   div:{
     maxWidth:"80%",
    margin: 'auto',
    border: '1px solid blue'
   },
 table:{
  th:{ 
   backgroundCOlor: "rgb(20,150,255)",
   color: "#fff"
  },
  setting:{
   boxShadow: "0 0 8 rgb(180,180,180)",
   margin: "auto",
   width :'90%',
   color: "red",
   border: "1px solid red"}
 }
}
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
    
    <div style={style.div}>
      <table style={style.table.setting} className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th style={style.table.th}>ID</th>
         <th style={style.table.th}>Date/Heure</th>
<th style={style.table.th}>site</th>
<th style={style.table.th}>Distance</th>
<th style={style.table.th}>Responsable</th>
<th style={style.table.th}>Téléphone</th>
<th style={style.table.th}>Temps 1-2</th>
<th style={style.table.th}>Temps 2-3</th>
<th style={style.table.th}>Estimation</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} className="text-center border-t border-gray-200" >
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
