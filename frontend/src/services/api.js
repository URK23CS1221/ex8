import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Students API
export const studentAPI = {
  getAll: () => api.get('/students'),
  getById: (id) => api.get(`/students/${id}`),
  create: (data) => api.post('/students', data),
  update: (id, data) => api.put(`/students/${id}`, data),
  delete: (id) => api.delete(`/students/${id}`),
};

// Fees API
export const feeAPI = {
  getAll: () => api.get('/fees'),
  getById: (id) => api.get(`/fees/${id}`),
  create: (data) => api.post('/fees', data),
  update: (id, data) => api.put(`/fees/${id}`, data),
  delete: (id) => api.delete(`/fees/${id}`),
  getByStudentId: (studentId) => api.get(`/fees/student/${studentId}`),
};

export default api;