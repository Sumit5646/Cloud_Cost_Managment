// apiService.js - Consolidated API service using JSON Server
import axios from 'axios';

const BIN_ID = '69440c9280b27952c6e784b6'; // From jsonbin.io
const API_KEY = '$2a$10$Ba48UKlUoDSHfgXGcSVA0.7N96B5UmYJxirjRAyTczltgJuKrVMRO'; // Get from JSONBin settings
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

const api = axios.create({
  headers: {
    'X-Master-Key': API_KEY,
    'Content-Type': 'application/json'
  }
});

// Get all data
export const getAllData = async () => {
  const res = await api.get(BASE_URL);
  return res.data.record; // JSONBin wraps response in "record"
};

// Get users
export const getUsers = async () => {
  const data = await getAllData();
  return data.users;
};

// Create user
export const createUser = async (newUser) => {
  const data = await getAllData();
  newUser.id = `user_${Date.now()}`;
  newUser.createdAt = new Date().toISOString();
  data.users.push(newUser);
  
  const res = await api.put(BASE_URL, data);
  return newUser;
};

// Update user
export const updateUser = async (userId, updates) => {
  const data = await getAllData();
  const userIndex = data.users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) throw new Error('User not found');
  data.users[userIndex] = { ...data.users[userIndex], ...updates };
  
  await api.put(BASE_URL, data);
  return data.users[userIndex];
};

// Delete user
export const deleteUser = async (userId) => {
  const data = await getAllData();
  data.users = data.users.filter(u => u.id !== userId);
  await api.put(BASE_URL, data);
};

// Same pattern for departments, budgets, alerts, etc.
export const getDepartments = async () => {
  const data = await getAllData();
  return data.departments;
};

export const createDepartment = async (newDept) => {
  const data = await getAllData();
  newDept.id = Math.max(...data.departments.map(d => d.id), 0) + 1;
  data.departments.push(newDept);
  
  await api.put(BASE_URL, data);
  return newDept;
};

export const updateDepartment = async (deptId, updates) => {
  const data = await getAllData();
  const deptIndex = data.departments.findIndex(d => d.id === deptId);
  
  if (deptIndex === -1) throw new Error('Department not found');
  data.departments[deptIndex] = { ...data.departments[deptIndex], ...updates };
  
  await api.put(BASE_URL, data);
  return data.departments[deptIndex];
};

export const deleteDepartment = async (deptId) => {
  const data = await getAllData();
  data.departments = data.departments.filter(d => d.id !== deptId);
  await api.put(BASE_URL, data);
};

// For dashboard stats
export const getDashboard = async () => {
  const data = await getAllData();
  return data.dashboard;
};

export const getAnalytics = async () => {
  const data = await getAllData();
  return data.analytics;
};
