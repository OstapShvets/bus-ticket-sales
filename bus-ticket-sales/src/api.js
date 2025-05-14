import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const registerUser = (name, email, password) =>
  axios.post(`${API_BASE}/register`, { name, email, password });

export const loginUser = (email, password) =>
  axios.post(`${API_BASE}/login`, { email, password });

export const getTopRoutes = () =>
  axios.get(`${API_BASE}/top-routes`);

export const searchRoutes = ({ origin, destination, date }) =>
  axios.get(`${API_BASE}/search`, { params: { origin, destination, date } });

export const bookTicket = (data) =>
  axios.post(`${API_BASE}/tickets`, data);

export const getTickets = (user_id) =>
  axios.get(`${API_BASE}/tickets`, { params: { user_id } });

export const getTicket = (id) =>
  axios.get(`${API_BASE}/tickets/${id}`);

export const cancelTicket = (id) =>
  axios.delete(`${API_BASE}/tickets/${id}`);
