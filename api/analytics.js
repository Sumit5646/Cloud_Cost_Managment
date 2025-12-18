import axios from 'axios';

const BIN_ID = process.env.JSONBIN_BIN_ID;
const API_KEY = process.env.JSONBIN_API_KEY;
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

const api = axios.create({
  headers: {
    'X-Master-Key': API_KEY,
    'Content-Type': 'application/json'
  }
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const response = await api.get(BASE_URL);
      const data = response.data.record;
      res.status(200).json(data.analytics);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch analytics data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
