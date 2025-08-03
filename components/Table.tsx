'use client';
import React, { useEffect, useState } from 'react';
 
const generateNumber=():string=>{
    const suffix=["81","82","83","84","85","89","90","97","99"]
    let num=''
    for (let index = 0; index < 7; index++) {
            num=num+Math.floor(Math.random()*10);  
    }
    return "+243"+suffix[Math.floor(Math.random()*9)]+num
}//Générateurs des numéros
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
const rivieres=[
 {
    id: Math.floor(Math.random()*100),
    timestamp: "",
    riviere: 'Rivière de Bandal',
    adresse: 'Bandalungwa',
    distance: Math.floor(Math.random()*100),
    nom_resp: '',
    tel: generateNumber(),
    temps12: Math.floor(Math.random()*100),
    temps23: Math.floor(Math.random()*100),
    estimation: Math.floor(Math.random()*100)
},
{
    id: Math.floor(Math.random()*100),
    timestamp: "",
    riviere: 'NDJILI',
    adresse: 'COmmne de Ndjili',
    distance: Math.floor(Math.random()*100),
    nom_resp: '',
    tel: generateNumber(),
    temps12: Math.floor(Math.random()*100),
    temps23: Math.floor(Math.random()*100),
    estimation: Math.floor(Math.random()*100)
},
{
    id: Math.floor(Math.random()*100),
    timestamp: "",
    riviere: 'Kisenso',
    adresse: 'Dans la commune de Kisenso', 
    distance: Math.floor(Math.random()*100),
    nom_resp: '',
    tel: generateNumber(),
    temps12: Math.floor(Math.random()*100),
    temps23: Math.floor(Math.random()*100),
    estimation: Math.floor(Math.random()*100)
},
{
    id: Math.floor(Math.random()*100),
    timestamp: "",
    riviere: 'Kongo',
    adresse: 'Commune de Lingwala',
    distance: Math.floor(Math.random()*100),
    nom_resp: '',
    tel: generateNumber(),
    temps12: Math.floor(Math.random()*100),
    temps23: Math.floor(Math.random()*100),
    estimation: Math.floor(Math.random()*100)
},
{
    id: Math.floor(Math.random()*100),
    timestamp: "",
    riviere: 'Rivière Martyrs',
    adresse: 'KASAVUVU',
    distance: Math.floor(Math.random()*100),
    nom_resp: '',
    tel: generateNumber(),
    temps12: Math.floor(Math.random()*100),
    temps23: Math.floor(Math.random()*100),
    estimation: Math.floor(Math.random()*100)
},
{
    id: Math.floor(Math.random()*100),
    timestamp: "",
    riviere: 'UPN',
    adresse: 'NGALIEMA',
    distance: Math.floor(Math.random()*100),
    nom_resp: '',
    tel: generateNumber(),
    temps12: Math.floor(Math.random()*100),
    temps23: Math.floor(Math.random()*100),
    estimation: Math.floor(Math.random()*100)
}
]
const style={
   div:{
     maxWidth:"80%",
    margin: 'auto'
   },
 table:{
  th:{ 
   border: '1px solid rgb(20,150,255)',
   background: "rgb(20,150,255)",
   color: "#fff"
  },
  tr:{
   background:"rgb(230,230,255)"
  },
  tr_s:{
   background:"rgb(240,240,255)"
  },
  setting:{
   boxShadow: "0 0 8px rgb(180,180,180)",
   margin: "auto",
   width :'90%',
   borderRadius: "8px"
  }
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
<th style={style.table.th}>Site .:.</th>
<th style={style.table.th}>Distance</th>
<th style={style.table.th}>Responsable</th>
<th style={style.table.th}>Téléphone</th>
<th style={style.table.th}>Temps 1-2</th>
<th style={style.table.th}>Temps 2-3</th>
<th style={style.table.th}>Estimation</th>
          </tr>
        </thead>
        <tbody>
          {rivieres.map((item, idx) => (
            <tr key={idx} style={idx%2===0 ? style.table.tr_s:style.table.tr} className="text-center border-t border-gray-200" >
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
