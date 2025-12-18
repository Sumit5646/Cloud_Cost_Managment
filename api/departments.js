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
      res.status(200).json(data.departments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch departments' });
    }
  } else if (req.method === 'POST') {
    try {
      const newDept = req.body;
      const response = await api.get(BASE_URL);
      const data = response.data.record;
      newDept.id = Math.max(...data.departments.map(d => d.id), 0) + 1;
      data.departments.push(newDept);
      await api.put(BASE_URL, data);
      res.status(201).json(newDept);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create department' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { deptId, updates } = req.body;
      const response = await api.get(BASE_URL);
      const data = response.data.record;
      const deptIndex = data.departments.findIndex(d => d.id === deptId);

      if (deptIndex === -1) {
        return res.status(404).json({ error: 'Department not found' });
      }

      data.departments[deptIndex] = { ...data.departments[deptIndex], ...updates };
      await api.put(BASE_URL, data);
      res.status(200).json(data.departments[deptIndex]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update department' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { deptId } = req.body;
      const response = await api.get(BASE_URL);
      const data = response.data.record;
      data.departments = data.departments.filter(d => d.id !== deptId);
      await api.put(BASE_URL, data);
      res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete department' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
