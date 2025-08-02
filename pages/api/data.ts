import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'database.json');
const isVercel = !!process.env.VERCEL;
let memoryStore: any[] = [];

function generateData() {
  const lieux = ['Kintambo', 'Bandal', 'Kalamu', 'Kingabwa', 'Ndjili', 'Gombe'];
  const lieu = lieux[Math.floor(Math.random() * lieux.length)];
  const now = new Date().toISOString();

  return {
    id: Date.now(),
    timestamp: now,
    riviere: 'Congo',
    adresse: lieu,
    distance: Math.floor(Math.random() * 100),
    nom_resp: 'Agent-' + Math.floor(Math.random() * 1000),
    tel: '+243' + Math.floor(890000000 + Math.random() * 10000000),
    temps12: Math.floor(Math.random() * 100),
    temps23: Math.floor(Math.random() * 100),
    estimation: Math.floor(Math.random() * 100),
  };
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const data = isVercel ? memoryStore : JSON.parse(fs.readFileSync(dataFile, 'utf8') || '[]');
    res.status(200).json(data);
  } else if (req.method === 'POST') {
    const newData = generateData();
    if (isVercel) {
      memoryStore.push(newData);
    } else {
      const data = fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile, 'utf8') || '[]') : [];
      data.push(newData);
      fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    }
    res.status(200).json({ message: 'Data added', data: newData });
  } else {
    res.status(405).end();
  }
}
